from datetime import datetime, timedelta
from django.db.models import Min, Max

from .models import Booking


def get_consecutive_booking_times(date, user, room):
    # Query all bookings with the same date, user, and room
    same_bookings = Booking.objects.filter(
        date=date,
        user=user,
        room=room
    ).order_by('time')

    # Get the first and last time of consecutive bookings
    first_time = same_bookings.aggregate(first_time=Min('time'))['first_time']
    last_time = same_bookings.aggregate(last_time=Max('time'))['last_time']

    # Check for consecutive bookings
    for booking in same_bookings:
        if datetime.combine(date, booking.time) - timedelta(hours=1) == datetime.combine(date, last_time):
            last_time = booking.time
        else:
            break

    # Convert time objects to datetime objects
    first_datetime = datetime.combine(date, first_time)
    last_datetime = datetime.combine(date, last_time)

    # Check if it's a range or single time
    if first_time == last_time:
        # If it's a single time, return it with the next hour
        return f"{first_time.strftime('%H:%M')}-{(first_datetime + timedelta(hours=1)).time().strftime('%H:%M')}"
    else:
        # If it's a range, return the first hour and last + 1 hour
        return f"{first_time.strftime('%H:%M')}-{(last_datetime + timedelta(hours=1)).time().strftime('%H:%M')}"
