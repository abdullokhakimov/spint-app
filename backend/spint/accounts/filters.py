import django_filters
from django.db.models import Q
from .models import Facility, UserAccount, Notification, Order


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


class OrderFilter(django_filters.FilterSet):
    user = django_filters.NumberFilter(method='filter_by_user_or_invited_user')
    owner = django_filters.NumberFilter(field_name='room__facility__owner__id', label="Владелец сооружения id")

    class Meta:
        model = Order
        fields = ['user']

    def filter_by_user_or_invited_user(self, queryset, name, value):
        return queryset.filter(
            Q(user_id=value) | Q(invited_users__id=value)
        ).distinct()


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