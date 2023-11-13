import requests
from src.shared_dependencies import generateContentIdeas
import schedule
import time

def autoPostContent(platform_api_keys):
    content_ideas = generateContentIdeas()
    for idea in content_ideas:
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

def scheduleAutoPosting(platform_api_keys, schedule_time):
    schedule.every().day.at(schedule_time).do(autoPostContent, platform_api_keys)
    while True:
        schedule.run_pending()
        time.sleep(1)

def main():
    platform_api_keys = {
        "facebook": "your_facebook_api_key",
        "twitter": "your_twitter_api_key",
        "instagram": "your_instagram_api_key",
        # Add more platforms as needed
    }
    schedule_time = "09:00"  # The time when the posts should be auto posted. Format: "HH:MM"
    scheduleAutoPosting(platform_api_keys, schedule_time)

if __name__ == '__main__':
    main()
