import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

# Define the base URL for the application
BASE_URL = 'http://localhost:3000'

# Define the test cases
class UserAcceptanceTests(unittest.TestCase):
    def setUp(self):
        # Set up the Selenium WebDriver
        self.driver = webdriver.Chrome()

    def test_home_page(self):
        # Test the home page loading and UI elements
        self.driver.get(BASE_URL)
        assert 'Influencer' in self.driver.title

    def tearDown(self):
        # Close the WebDriver
        self.driver.close()

if __name__ == '__main__':
    unittest.main()
