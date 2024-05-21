from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Game, Benefit, Facility, Room, Region, Booking, Invitation, Notification
from djoser.serializers import UserSerializer

User = get_user_model()

class UserSerializer(UserSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_owner')

class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ('id', 'title',)
class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('id', 'title', 'svg_icon_colored', 'svg_icon_non_colored')

class BenefitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Benefit
        fields = ('id', 'title', 'svg_icon')

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('id', 'date', 'time')

class RoomSerializer(serializers.ModelSerializer):
    benefits = BenefitSerializer(many=True, read_only=True)
    bookings = BookingSerializer(many=True, read_only=True, source='booking_set')

    class Meta:
        model = Room
        fields = ['id', 'title', 'price', 'bookings', 'benefits']


class FacilityListSerializer(serializers.ModelSerializer):
    game = GameSerializer(read_only=True)
    region = RegionSerializer(read_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Facility
        fields = ('id', 'title', 'game', 'region', 'image_url', 'address', 'address_url')

    def get_image_url(self, obj):
        if obj.images:
            return obj.images.url
        return None

class FacilityMapCoordinatesListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = ('id', 'title', 'address_coordinates', 'start_time', 'end_time')


class FacilityDetailSerializer(serializers.ModelSerializer):
    game = GameSerializer(read_only=True)
    rooms = RoomSerializer(many=True, read_only=True, source='room_set')
    region = RegionSerializer(read_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Facility
        fields = ('id', 'title', 'game', 'region', 'rooms', 'image_url', 'address', 'address_url', 'address_coordinates', 'start_time', 'end_time', 'phone')

    def get_image_url(self, obj):
        if obj.images:
            return obj.images.url
        return None


class FilteredBookingSerializer(serializers.ModelSerializer):
    facility_title = serializers.SerializerMethodField()
    facility_id = serializers.SerializerMethodField()
    user = serializers.CharField(source='user.username')
    room_id = serializers.IntegerField(source='room.id')
    room_title = serializers.CharField(source='room.title')
    room_price = serializers.IntegerField(source='room.price')
    time = serializers.SerializerMethodField()
    invited_users = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'user', 'facility_title', 'facility_id', 'room_id', 'room_title', 'date', 'time', 'room_price', 'invited_users',]

    def get_facility_title(self, obj):
        return obj.room.facility.title

    def get_facility_id(self, obj):
        return obj.room.facility.id

    def get_time(self, obj):
        return obj.time.strftime('%H:%M')


class InvitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invitation
        fields = ['id', 'sender', 'receiver', 'booking', 'status']


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'type', 'receiver', 'message', 'created_at', 'invitation']