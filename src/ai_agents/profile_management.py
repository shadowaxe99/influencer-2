```python
from pymongo import MongoClient
from bson.objectid import ObjectId

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['influencer_platform']
collection = db['user_profiles']

# User Profile Schema
UserProfileSchema = {
    "name": str,
    "bio": str,
    "social_links": dict,
    "media_kit": dict
}

def manageUserProfile(user_id, update_data):
    """
    Function to manage user profile
    """
    # Validate update data
    for key, value in update_data.items():
        if key not in UserProfileSchema:
            raise ValueError(f"Invalid field: {key}")
        if not isinstance(value, UserProfileSchema[key]):
            raise ValueError(f"Invalid data type for field: {key}. Expected {UserProfileSchema[key]}")

    # Update user profile
    collection.update_one({"_id": ObjectId(user_id)}, {"$set": update_data})

def getProfile(user_id):
    """
    Function to get user profile
    """
    return collection.find_one({"_id": ObjectId(user_id)})

def createProfile(profile_data):
    """
    Function to create user profile
    """
    # Validate profile data
    for key, value in profile_data.items():
        if key not in UserProfileSchema:
            raise ValueError(f"Invalid field: {key}")
        if not isinstance(value, UserProfileSchema[key]):
            raise ValueError(f"Invalid data type for field: {key}. Expected {UserProfileSchema[key]}")

    # Create user profile
    collection.insert_one(profile_data)
```