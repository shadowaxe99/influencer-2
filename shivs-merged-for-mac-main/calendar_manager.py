from gcsa.google_calendar import GoogleCalendar
from gcsa.event import Event
from datetime import datetime, timedelta


class CalendarManager:
    def __init__(self, email_address):
        self.calendar = GoogleCalendar(email_address)

    def get_events(self, start_date, end_date):
        events = self.calendar.get_events(start=start_date, end=end_date)
        return events

    def create_event(self, title, start_date, end_date, description=None, location=None):
        event = Event(
            title,
            start=start_date,
            end=end_date,
            description=description,
            location=location
        )
        self.calendar.add_event(event)