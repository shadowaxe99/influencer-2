```python
import pymongo

def calculate_brand_collaborations():
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["influencer_platform"]
    collection = db["brandCollaborations"]

    total_brand_collaborations = collection.count_documents({})

    return total_brand_collaborations

def main():
    total_brand_collaborations = calculate_brand_collaborations()
    print(f"Total Brand Collaborations: {total_brand_collaborations}")

if __name__ == "__main__":
    main()
```