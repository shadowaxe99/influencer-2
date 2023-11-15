```python
import pymongo

def get_user_feedback():
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["influencer_platform"]
    feedback_collection = db["user_feedback"]

    feedbacks = feedback_collection.find()
    return feedbacks

def calculate_feedback_score(feedbacks):
    total_score = 0
    for feedback in feedbacks:
        total_score += feedback['score']
    
    average_score = total_score / len(feedbacks)
    return average_score

def main():
    feedbacks = get_user_feedback()
    feedback_score = calculate_feedback_score(feedbacks)
    print("Average User Feedback Score: ", feedback_score)

if __name__ == "__main__":
    main()
```