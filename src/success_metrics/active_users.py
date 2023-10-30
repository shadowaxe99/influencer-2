```python
import pymongo

def get_active_users():
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["influencer_platform"]
    users = db["users"]

    active_users = users.find({"status": "active"}).count()
    return active_users

def calculate_active_user_rate():
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["influencer_platform"]
    users = db["users"]

    total_users = users.find().count()
    active_users = get_active_users()

    active_user_rate = (active_users / total_users) * 100
    return active_user_rate

def print_active_user_metrics():
    active_users = get_active_users()
    active_user_rate = calculate_active_user_rate()

    print(f"Total Active Users: {active_users}")
    print(f"Active User Rate: {active_user_rate}%")
```