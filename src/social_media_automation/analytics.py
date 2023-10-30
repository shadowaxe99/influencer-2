```python
import pandas as pd
from sklearn import metrics

class SocialMediaAnalytics:
    def __init__(self, postPerformance):
        self.postPerformance = postPerformance

    def calculate_engagement_rate(self):
        likes = self.postPerformance['likes']
        comments = self.postPerformance['comments']
        shares = self.postPerformance['shares']
        followers = self.postPerformance['followers']

        engagement_rate = (likes + comments + shares) / followers * 100
        return engagement_rate

    def calculate_conversion_rate(self):
        clicks = self.postPerformance['clicks']
        impressions = self.postPerformance['impressions']

        conversion_rate = clicks / impressions * 100
        return conversion_rate

    def calculate_bounce_rate(self):
        single_page_sessions = self.postPerformance['single_page_sessions']
        total_sessions = self.postPerformance['total_sessions']

        bounce_rate = single_page_sessions / total_sessions * 100
        return bounce_rate

    def calculate_retention_rate(self):
        users_at_start = self.postPerformance['users_at_start']
        users_at_end = self.postPerformance['users_at_end']

        retention_rate = users_at_end / users_at_start * 100
        return retention_rate

    def calculate_churn_rate(self):
        users_lost = self.postPerformance['users_lost']
        users_at_start = self.postPerformance['users_at_start']

        churn_rate = users_lost / users_at_start * 100
        return churn_rate

    def calculate_average_session_duration(self):
        total_session_duration = self.postPerformance['total_session_duration']
        total_sessions = self.postPerformance['total_sessions']

        average_session_duration = total_session_duration / total_sessions
        return average_session_duration

    def calculate_page_views_per_session(self):
        total_page_views = self.postPerformance['total_page_views']
        total_sessions = self.postPerformance['total_sessions']

        page_views_per_session = total_page_views / total_sessions
        return page_views_per_session

    def calculate_average_time_on_page(self):
        total_time_on_page = self.postPerformance['total_time_on_page']
        total_page_views = self.postPerformance['total_page_views']

        average_time_on_page = total_time_on_page / total_page_views
        return average_time_on_page

    def calculate_new_sessions_percentage(self):
        new_sessions = self.postPerformance['new_sessions']
        total_sessions = self.postPerformance['total_sessions']

        new_sessions_percentage = new_sessions / total_sessions * 100
        return new_sessions_percentage

    def calculate_returning_users_percentage(self):
        returning_users = self.postPerformance['returning_users']
        total_users = self.postPerformance['total_users']

        returning_users_percentage = returning_users / total_users * 100
        return returning_users_percentage
```