import os
import facebook
import tweepy


def share_on_facebook(content):
    graph = facebook.GraphAPI(access_token=os.getenv('FACEBOOK_ACCESS_TOKEN'), version='3.1')
    graph.put_object(parent_object='me', connection_name='feed', message=content)

def share_on_twitter(content):
    auth = tweepy.OAuthHandler(os.getenv('TWITTER_CONSUMER_KEY'), os.getenv('TWITTER_CONSUMER_SECRET'))
    auth.set_access_token(os.getenv('TWITTER_ACCESS_TOKEN'), os.getenv('TWITTER_ACCESS_TOKEN_SECRET'))
    api = tweepy.API(auth)
    api.update_status(content)