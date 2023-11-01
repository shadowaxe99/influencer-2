I can assist with that, please find an example of a separated approach:

First file (`ai_agents.py`):

```python
# Import necessary libraries
import requests

# Define Content Management class
class ContentManagement:
    def __init__(self, platform_api_keys):
        self.platform_api_keys = platform_api_keys
    
    def autoPostContent(self, contentIdeas):
        for idea in contentIdeas:
            for platform, api_key in self.platform_api_keys.items():
                response = requests.post(
                    url=f"https://api.{platform}.com/v1/posts",
                    headers={"Authorization": f"Bearer {api_key}"},
                    json={"content": idea}
                )
                if response.status_code != 200:
                    print(f"Failed to post content on {platform}.")
                else:
                    print(f"Successfully posted content on {platform}.")
```

Another file (`scheduler.py`):

```python
from src.ai_agents import ContentManagement

class Scheduler:
    def __init__(self, ai_agent, schedule_time):
        self.ai_agent = ai_agent
        self.schedule_time = schedule_time
        
    def scheduleAutoPosting(self, contentIdeas):
        schedule.every().day.at(self.schedule_time).do(self.ai_agent.autoPostContent, contentIdeas)
```

and last file (`main.py`):

```python
from src.ai_agents import ContentManagement
from src.scheduler import Scheduler

def main():
    platform_api_keys = {
        "facebook": "your_facebook_api_key",
        "twitter": "your_twitter_api_key",
        "instagram": "your_instagram_api_key",
        # Add more platforms as needed
    }
    
    # Instantiate an instance of the ContentManagement class
    ai_agent = ContentManagement(platform_api_keys)

    schedule_time = "09:00"  # The time when the posts should be auto posted. Format: "HH:MM"
    
    # Instantiate the Scheduler with the ai_agent
    scheduler = Scheduler(ai_agent, schedule_time)
    scheduler.scheduleAutoPosting(contentIdeas)

if __name__ == "__main__":
    main()
```

You might need to adjust these according to your real file structure. Additionally, This code assumes that you have an installed scheduler package and contentIdeas variable available.