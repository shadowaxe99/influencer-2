```python
import requests
from src.ai_agents.content_management import contentIdeas

def autoPostContent(contentIdeas, platform_api_keys):
    for idea in contentIdeas:
        for platform, api_key in platform_api_keys.items():
            response = requests.post(
                url=f"https://api.{platform}.com/v1/posts",
                headers={"Authorization": f"Bearer {api_key}"},
                json={"content": idea}
            )
            if response.status_code != 200:
                print(f"Failed to post content on {platform}.")
            else:
                print(f"Successfully posted content on {platform}.")

def scheduleAutoPosting(contentIdeas, platform_api_keys, schedule_time):
    # This function uses a scheduler like 'schedule' or 'APScheduler' to run the autoPostContent function at the given schedule_time
    # Please install the required scheduler package and import it at the top of this file
    # Below is a pseudo code
    schedule.every().day.at(schedule_time).do(autoPostContent, contentIdeas, platform_api_keys)

def main():
    platform_api_keys = {
        "facebook": "your_facebook_api_key",
        "twitter": "your_twitter_api_key",
        "instagram": "your_instagram_api_key",
        # Add more platforms as needed
    }
    schedule_time = "09:00"  # The time when the posts should be auto posted. Format: "HH:MM"
    scheduleAutoPosting(contentIdeas, platform_api_keys, schedule_time)

if __name__ == "__main__":
    main()
```