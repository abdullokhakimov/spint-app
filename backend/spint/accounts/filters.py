import django_filters
from django.db.models import Q
from .models import Facility, Booking, UserAccount, Notification


class FacilitySearchFilter(django_filters.FilterSet):
    title_or_address = django_filters.CharFilter(method='filter_title_or_address', label='Поиск по названию и адресу')
    facility_game_id = django_filters.NumberFilter(field_name='game__id')
    facility_region_id = django_filters.NumberFilter(field_name='region__id')

    class Meta:
        model = Facility
        fields = []

    def filter_title_or_address(self, queryset, name, value):
        value = value.lower()
        return queryset.filter(
            Q(title__icontains=value) |
            Q(address__icontains=value)
        )


class BookingFilter(django_filters.FilterSet):
    user = django_filters.NumberFilter(field_name='user__id')
    owner = django_filters.NumberFilter(field_name='room__facility__owner__id', label="Владелец сооружения id")


    class Meta:
        model = Booking
        fields = ['user']

class UserSearchFilter(django_filters.FilterSet):
    username = django_filters.CharFilter(field_name='username', label='Поиск по имени', lookup_expr='icontains')

    class Meta:
        model = UserAccount
        fields = []

class NotificationFilter(django_filters.FilterSet):
    receiver = django_filters.NumberFilter(field_name='receiver__id', label='Поиск по пользователю')

    class Meta:
        model = Notification
        fields = ['receiver']