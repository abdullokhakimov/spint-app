from datetime import datetime, timedelta

def format_time_range(times):
    if not times:
        return ""

    # Parse the first time in the list
    start_time = datetime.strptime(times[0], "%H:%M")

    # Determine the end time by adding the number of time entries to the start time
    end_time = start_time + timedelta(hours=len(times))

    # If end_time goes past midnight, adjust it
    if end_time.day > start_time.day:
        end_time = end_time.replace(day=start_time.day)

    # Format the start and end times back to string
    start_time_str = start_time.strftime("%H:%M")
    end_time_str = end_time.strftime("%H:%M")

    return f"{start_time_str} - {end_time_str}"