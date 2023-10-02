from scheduler import Scheduler
from email_service import EmailService
from calendar_service import CalendarService


def main():
    # Instantiate scheduler, email service, and calendar service
    scheduler = Scheduler()
    email_service = EmailService()
    calendar_service = CalendarService()

    recipient = 'example@example.com'
    subject = 'Test Email'
    body = 'This is a test email'
    date_time = '2022-01-01 12:00:00'
    title = 'Test Event'
    start_time = '2022-01-01 12:00:00'
    end_time = '2022-01-01 13:00:00'

    email_service.authenticate()
    scheduler.schedule_email(recipient, subject, body, date_time)
    calendar_service.create_event(title, start_time, end_time)


if __name__ == '__main__':
    main()
