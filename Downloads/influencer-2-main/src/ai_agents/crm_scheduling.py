import datetime
from pymongo import MongoClient
from bson.objectid import ObjectId

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['influencer_platform']
collection = db['contactDatabase']

# Shared variables
contactDatabase = []
appointmentSchedule = []


def manageContacts():
    global contactDatabase
    contactDatabase = list(collection.find())


def scheduleAppointments():
    global appointmentSchedule
    now = datetime.datetime.now()
    for contact in contactDatabase:
        next_appointment = contact.get('next_appointment')
        if next_appointment and next_appointment < now:
            new_appointment = now + datetime.timedelta(days=7)
            appointmentSchedule.append(contact)
            collection.update_one({'_id': ObjectId(contact['_id'])}, {
                                  '$set': {'next_appointment': new_appointment}})
            contact['next_appointment'] = new_appointment


def initializeScheduling():
    manageContacts()
    scheduleAppointments()


initializeScheduling()
