```python
import pymongo

def calculate_user_engagement():
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["influencer_platform"]
    collection = db["userProfile"]

    total_engagement = 0
    total_users = collection.count_documents({})

    for user in collection.find({}):
        total_engagement += user['engagement']

    average_engagement = total_engagement / total_users

    return average_engagement

print(calculate_user_engagement())
```