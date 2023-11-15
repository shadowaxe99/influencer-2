from pymongo import MongoClient
from bson.objectid import ObjectId

class UserProfile:
    """
    Represents the user profile within the application and provides methods to manage it.
    """
    # User Profile Schema
    UserProfileSchema = {
        "name": str,
        "bio": str,
        "social_links": dict,
        "media_kit": dict
    }

    def __init__(self):
        """
        Initializes a new instance of the UserProfile class.
        """
        # MongoDB connection
        self.client = MongoClient('mongodb://localhost:27017/')
        self.db = self.client['influencer_platform']
        self.collection = self.db['user_profiles']

    def manageUserProfile(self, user_id, update_data):
        """
        Manages the user's profile information, including creation, update, and deletion.
        """
        # Validate update data
        for key, value in update_data.items():
            if key not in self.UserProfileSchema:
                raise ValueError(f"Invalid field: {key}")
            if not isinstance(value, self.UserProfileSchema[key]):
                raise ValueError(f"Invalid data type for field: {key}. Expected {self.UserProfileSchema[key]}")

        # Update user profile
        self.collection.update_one({"_id": ObjectId(user_id)}, {"$set": update_data})

    def getProfile(self, user_id):
        """
        Retrieves the profile information of a user.
        """
        return self.collection.find_one({"_id": ObjectId(user_id)})

    def createProfile(self, profile_data):
        """
        Creates a new user profile.
        """
        # Validate profile data
        for key, value in profile_data.items():
            if key not in self.UserProfileSchema:
                raise ValueError(f"Invalid field: {key}")
            if not isinstance(value, self.UserProfileSchema[key]):
                raise ValueError(f"Invalid data type for field: {key}. Expected {self.UserProfileSchema[key]}")

        # Create user profile
        self.collection.insert_one(profile_data)
