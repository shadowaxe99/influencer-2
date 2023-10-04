import imaplib
import smtplib
import email
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


class EmailManager:
    def __init__(self, imap_server, smtp_server, email_address, password):
        self.imap_server = imap_server
        self.smtp_server = smtp_server
        self.email_address = email_address
        self.password = password

    def get_inbox(self):
        mail = imaplib.IMAP4_SSL(self.imap_server)
        mail.login(self.email_address, self.password)
        mail.select('inbox')
        result, data = mail.uid('search', None, 'ALL')
        return data

    def send_email(self, to_address, subject, message):
        msg = MIMEMultipart()
        msg['From'] = self.email_address
        msg['To'] = to_address
        msg['Subject'] = subject
        msg.attach(MIMEText(message, 'plain'))
        server = smtplib.SMTP(self.smtp_server, 587)
        server.starttls()
        server.login(self.email_address, self.password)
        text = msg.as_string()
        server.sendmail(self.email_address, to_address, text)
        server.quit()