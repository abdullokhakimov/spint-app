import locale
import random

from babel.dates import format_date
from django.core.exceptions import ObjectDoesNotExist
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, mixins, pagination, status, permissions
from rest_framework.decorators import action
from rest_framework.generics import ListAPIView, RetrieveAPIView, GenericAPIView, UpdateAPIView
from djoser.serializers import UserSerializer
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .filters import FacilitySearchFilter, UserSearchFilter, NotificationFilter, OrderFilter
from .models import Facility, Region, Game, Benefit, Room, Booking, Invitation, Notification, Order
from .serializers import RegionSerializer, BookingSerializer, GameSerializer, BenefitSerializer, FacilityListSerializer, \
    FacilityDetailSerializer, FacilityMapCoordinatesListSerializer, RoomSerializer, \
    InvitationSerializer, NotificationSerializer, OrderSerializer, PhoneNumberSerializer, VerifyCodeSerializer, \
    UpdateUserSerializer, UsersListSerializer
from .utils import format_time_range, send_sms_verification_code
from django.utils.translation import gettext as _
from paycomuz import Paycom
from paycomuz.views import MerchantAPIView

User = get_user_model()

class UserListView(ListAPIView):
    queryset = User.objects.filter(is_staff=False, is_superuser=False)
    serializer_class = UsersListSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = UserSearchFilter

class UpdateUserView(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UpdateUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class RegionListView(ListAPIView):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer

class GameListView(ListAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

class BenefitListView(ListAPIView):
    queryset = Benefit.objects.all()
    serializer_class = BenefitSerializer

class FacilityPagination(pagination.PageNumberPagination):
    page_size = 6

    def get_paginated_response(self, data):
        return Response({
            'next_page_param': self.page.next_page_number() if self.page.has_next() else None,
            'results': data
        })

class FacilityListView(ListAPIView):
    queryset = Facility.objects.all()
    serializer_class = FacilityListSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = FacilitySearchFilter
    pagination_class = FacilityPagination

class FacilityMapCoordinatesListView(ListAPIView):
    queryset = Facility.objects.all()
    serializer_class = FacilityMapCoordinatesListSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = FacilitySearchFilter

class FacilityDetailView(RetrieveAPIView):
    queryset = Facility.objects.all()
    serializer_class = FacilityDetailSerializer

class BookingsListView(ListAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

class RoomsListView(ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class BookingViewSet(ListAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

class InvitationViewSet(viewsets.ModelViewSet):
    queryset = Invitation.objects.all()
    serializer_class = InvitationSerializer

    def create(self, request, *args, **kwargs):
        sender = User.objects.get(id=request.data.get('sender'))
        receiver = User.objects.get(id=request.data.get('receiver'))
        order = Order.objects.get(id=request.data.get('order'))

        if sender == receiver:
            error_message = _("Вы не можете приглашать самого себя")
            return Response({"error": error_message},
                            status=status.HTTP_400_BAD_REQUEST)

        if order.user != sender:
            error_message = _("Только пользователь, создавший бронирование, может отправлять приглашения.")
            return Response({"error": error_message},
                            status=status.HTTP_400_BAD_REQUEST)

        existing_invitation = Invitation.objects.filter(sender=sender, receiver=receiver, order=order).exists()
        if existing_invitation:
            error_message = _("Вы уже отправляли приглашение этому пользователю для этого бронирования.")
            return Response({"error": error_message},
                            status=status.HTTP_400_BAD_REQUEST)

        invitation = Invitation.objects.create(sender=sender, receiver=receiver, order=order)
        invitation.save()

        locale.setlocale(locale.LC_TIME, 'ru_RU.UTF-8')
        notification = Notification.objects.create(
            type='invite_user_action',
            receiver=receiver,
            message_ru=f"Вы были приглашены в игру пользователем {sender.username} в <a href='/facility/{order.room.facility.id}'>{order.room.facility.title} {order.room.title}</a> {order.date.strftime('%d %B %Y г.')} {format_time_range(order.time)}",
            message_uz=f"{sender.username} sizni {format_date(order.date, 'd MMMM y', locale='uz')} yil {format_time_range(order.time)} gachan <a href='/facility/{order.room.facility.id}'>{order.room.facility.title} {order.room.title}</a> ga oʻyinga taklif qildi",
            invitation=invitation
        )
        notification.save()

        success_message = _("Приглашение отправлено")
        return Response({"message": success_message})

    def update(self, request, *args, **kwargs):
        invitation = self.get_object()

        if 'status' in request.data:
            if request.data['status'] == 'accepted':
                invitation.accept()

                notification = Notification.objects.get(invitation=invitation)
                notification.type = 'invite_user'
                notification.save()

                notification = Notification.objects.create(
                    type='invite_user',
                    receiver=invitation.sender,
                    message_ru=f"{invitation.receiver.username} принял ваше приглашение в игру",
                    message_uz=f"{invitation.receiver.username} o'yinga taklifingizni qabul qildi",
                    invitation=invitation
                )
                notification.save()

            elif request.data['status'] == 'rejected':
                try:
                    notification = Notification.objects.get(invitation=invitation)
                    notification.delete()
                except ObjectDoesNotExist:
                    pass

                # Create a notification for the sender
                notification = Notification.objects.create(
                    type='invite_user',
                    receiver=invitation.sender,
                    message_ru=f"{invitation.receiver.username} отклонил ваше приглашение в игру",
                    message_uz=f"{invitation.receiver.username} o'yinga taklifingizni rad etdi",
                    invitation=invitation
                )
                notification.save()
            else:
                error_message = _("Неправильный статус")
                return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)

        success_message = _(f"Статус приглашения {invitation.id} обновлен на {invitation.status}")
        return Response({"message": success_message})

    @action(detail=False, methods=['post'])
    def invite_by_uuid(self, request, *args, **kwargs):
        sender = User.objects.get(id=request.data.get('sender'))
        receiver = User.objects.get(id=request.data.get('receiver'))
        order = Order.objects.get(id=request.data.get('order'))

        invitation = Invitation.objects.create(sender=sender, receiver=receiver, order=order, status='accepted')
        invitation.save()
        invitation.accept()

        notification = Notification.objects.create(
            type='invite_user',
            receiver=invitation.sender,
            message_ru=f"{invitation.receiver.username} принял ваше приглашение в игру",
            message_uz=f"{invitation.receiver.username} o'yinga taklifingizni qabul qildi",
            invitation=invitation
        )
        notification.save()

        return Response(status=status.HTTP_200_OK)

class NotificationViewSet(ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    filter_backends = [DjangoFilterBackend]  # Add filter backend
    filterset_class = NotificationFilter

    @action(detail=False, methods=['get'])
    def unread_length(self, request):
        receiver_id = request.query_params.get('receiver_id')
        if not receiver_id:
            return Response({'error': 'receiver_id parameter is required'}, status=400)

        unread_notifications = self.queryset.filter(receiver_id=receiver_id, is_read=False)
        unread_notification_count = unread_notifications.count()
        return Response({'unread_notification_count': unread_notification_count})

    @action(detail=False, methods=['post'])
    def mark_as_read(self, request):
        receiver_id = request.data.get('receiver_id')
        if not receiver_id:
            return Response({'error': 'receiver_id parameter is required'}, status=status.HTTP_400_BAD_REQUEST)

        notifications = self.queryset.filter(receiver_id=receiver_id, is_read=False)
        if notifications.exists():
            notifications.update(is_read=True)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_200_OK)


class OrderViewSet(mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    filter_backends = [DjangoFilterBackend]  # Add filter backend
    filterset_class = OrderFilter

    @action(detail=False, methods=['get'], url_path='by-uuid/(?P<order_uuid>[^/.]+)')
    def get_by_uuid(self, request, order_uuid=None):
        try:
            order = Order.objects.get(order_uuid=order_uuid)
            serializer = self.get_serializer(order)
            return Response(serializer.data)
        except Order.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        order_instance = self.get_queryset().get(pk=response.data['id'])
        order_price = order_instance.total_price * 100

        paycom = Paycom()
        payme_checkout_url = paycom.create_initialization(amount=order_price, order_id=order_instance.id,
                                                          return_url='https://spint.uz/bookings/')

        # Update the link field with the payme_checkout_url
        order_instance.payme_checkout_link = payme_checkout_url
        order_instance.save()

        serializer = self.get_serializer(order_instance)
        return Response(serializer.data, status=response.status_code)

    def perform_create(self, serializer):
        order_instance = serializer.save()
        order_price = "{:.2f}".format(order_instance.total_price)

        paycom = Paycom()
        payme_checkout_url = paycom.create_initialization(amount=order_price, order_id=order_instance.id,
                                                          return_url='https://spint.uz/bookings/')

        # Update the link field with the payme_checkout_url
        order_instance.payme_checkout_link = payme_checkout_url
        order_instance.save()

    @action(detail=True, methods=['post'])
    def exclude_user(self, request, pk=None):
        order = self.get_object()
        user_id = request.data.get('user_id')

        if not user_id:
            error_message = _("Требуется данные пользователя")
            return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            error_message = _("Пользователь не найден")
            return Response({"error": error_message}, status=status.HTTP_404_NOT_FOUND)

        if user not in order.invited_users.all():
            error_message = _("Пользователь не в списке приглашенных пользователей")
            return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)

        order.invited_users.remove(user)
        order.save()

        try:
            invitation = Invitation.objects.get(order=order, receiver=user)
            invitation.status = 'excluded'
            invitation.save()

            notification = Notification.objects.create(
                type='invite_user',
                receiver=invitation.receiver,
                message_ru=f"Пользователь {invitation.sender.username} исключил вас из списка приглашенных пользователей игры",
                message_uz=f"Foydalanuvchi {invitation.sender.username} sizni o'yinga taklif qilingan foydalanuvchilar ro'yxatdan chiqarib tashladi",
                invitation=invitation
            )
            notification.save()
        except Invitation.DoesNotExist:
            error_message = _("Приглашение не найдено")
            return Response({"error": error_message}, status=status.HTTP_404_NOT_FOUND)

        success_message = _("Пользователь успешно исключен из списка приглашенных пользователей")
        return Response({"message": success_message})

class CheckOrder(Paycom):
    def check_order(self, amount, account, *args, **kwargs):
        order = Order.objects.filter(id=account["order_id"], is_finished=False).first()
		
        if not order:
            return self.ORDER_NOT_FOND
        if order.total_price * 100 != amount:
            return self.INVALID_AMOUNT

        return self.ORDER_FOUND

    def successfully_payment(self, account, transaction, *args, **kwargs):
        order = Order.objects.filter(id=transaction.order_key).first()
        if not order:
            return self.ORDER_NOT_FOND

        order.is_finished = True
        order.save()

        # Create bookings based on order data
        user = order.user
        room = order.room
        date = order.date
        times = order.time

        for t in times:
            Booking.objects.create(user=user, room=room, date=date, time=t)


    def cancel_payment(self, account, transaction, *args, **kwargs):
        order_id = transaction.order_key

        try:
            order = Order.objects.get(id=order_id)
        except Order.DoesNotExist:
            return self.ORDER_NOT_FOUND

        # Delete the order
        order.delete()


class TestView(MerchantAPIView):
    VALIDATE_CLASS = CheckOrder


class SendVerificationCodeView(GenericAPIView):
    serializer_class = PhoneNumberSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            phone_number = serializer.validated_data['phone_number']

            if User.objects.filter(phone_number=phone_number).exists():
                error_message = _("Такой номер телефона уже используется другим пользователем")
                return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)

            verification_code = f'{random.randint(1000, 9999)}'

            # Send the SMS
            # send_verification = send_sms_verification_code(phone_number=phone_number, verification_code=verification_code)
            # if send_verification == 'FAILED':
            #     return Response('FAILED', status=status.HTTP_400_BAD_REQUEST)

            return Response({'phone_number': phone_number, 'verification_code': verification_code}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyCodeAndAddPhoneNumberView(GenericAPIView):
    serializer_class = VerifyCodeSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user_id = serializer.validated_data['user_id']
            phone_number = serializer.validated_data['phone_number']

            user = User.objects.get(id=user_id)
            user.phone_number = phone_number
            user.save()

            return Response({'detail': 'Phone number updated successfully'}, status=status.HTTP_200_OK)