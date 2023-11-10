
import datetime
from pymongo import MongoClient

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['influencer_platform']
collection = db['contactDatabase']

# Shared variables
contactDatabase = []
appointmentSchedule = []

def manageContacts():
    global contactDatabase
    contacts = collection.find()
    for contact in contacts:
        contactDatabase.append(contact)

def scheduleAppointments():
    global appointmentSchedule
    for contact in contactDatabase:
        if 'next_appointment' in contact:
            if contact['next_appointment'] < datetime.datetime.now():
                contact['next_appointment'] = datetime.datetime.now() + datetime.timedelta(days=7)
                appointmentSchedule.append(contact)

manageContacts()
scheduleAppointments()
```