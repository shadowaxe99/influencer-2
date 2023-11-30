import urllib.request
from bs4 import BeautifulSoup

class WebScraper:
    def __init__(self, url):
        self.url = url

    def get_page_content(self):
        response = urllib.request.urlopen(self.url)
        return response.read().decode()

    def parse_content(self, content):
        soup = BeautifulSoup(content, 'html.parser')
        # Add your custom logic here to parse the HTML content
