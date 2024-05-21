from django.contrib import admin
from modeltranslation.admin import TranslationAdmin
from .models import UserAccount, Region, Game, Benefit, Facility, Room, Booking, Invitation, Notification


class RegionAdmin(TranslationAdmin):
    list_display = ('title', 'id')
    search_fields = ('title',)


class GameAdmin(TranslationAdmin):
    list_display = ('title', 'id')
    search_fields = ('title',)


class BenefitAdmin(admin.ModelAdmin):
    list_display = ('title', 'id')
    search_fields = ('title',)

class FacilityAdmin(admin.ModelAdmin):
    list_display = ('pk', 'title', 'region', 'game')
    list_display_links = ('title',)
    list_filter = ('title', 'region', 'region')

class RoomAdmin(admin.ModelAdmin):
    list_display = ('pk', 'title', 'facility', 'price')
    list_display_links = ('title',)
    list_filter = ('title', 'price',)


class BookingAdmin(admin.ModelAdmin):
    list_display = ('pk', 'facility_title', 'room_title', 'date', 'time')
    list_filter = ('room__facility', 'date',)
    list_display_links = ('facility_title',)


    def facility_title(self, obj):
        return obj.room.facility.title

    def room_title(self, obj):
        return obj.room.title

    facility_title.short_description = 'Название сооружения'
    room_title.short_description = 'Название кабинета'

class InvitationAdmin(admin.ModelAdmin):
    list_display = ('sender', 'receiver', 'booking', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('sender__username', 'receiver__username', 'booking__id')
    readonly_fields = ('created_at',)

class NotificationAdmin(TranslationAdmin):
    list_display = ('message', 'id')
    search_fields = ('message',)

admin.site.register(UserAccount)
admin.site.register(Region, RegionAdmin)
admin.site.register(Game, GameAdmin)
admin.site.register(Benefit, BenefitAdmin)
admin.site.register(Facility, FacilityAdmin)
admin.site.register(Room, RoomAdmin)
admin.site.register(Booking, BookingAdmin)
admin.site.register(Invitation, InvitationAdmin)
admin.site.register(Notification, NotificationAdmin)
