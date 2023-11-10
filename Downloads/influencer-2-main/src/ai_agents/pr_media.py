import requests
from bs4 import BeautifulSoup
from technology_stack.backend.database.mongodb import UserProfileSchema, PressReleaseSchema

class PRMediaAgent:
    """
    Manages the generation of press releases and monitoring of media mentions for brand collaborations.
    """
    def __init__(self):
        """
        Initializes a new instance of the PRMediaAgent class.
        """
        self.userProfile = UserProfileSchema()
        self.pressReleases = PressReleaseSchema()

    def generate_press_release(self, collaboration):
        """
        Creates a press release for a brand collaboration.

        Parameters:
            collaboration (dict): The brand collaboration data used to craft the press release.

        Returns:
            dict: A dictionary containing the press release details.
        """
        """
        Generates a press release for a new brand collaboration or event involving the influencer. The press release includes details such as the title, body, and date of the collaboration or event.

        Parameters:
            collaboration (dict): A dictionary containing information about the brand collaboration or event.

        Returns:
            dict: A dictionary representing the generated press release.
        """
        """
        Creates a press release for a new brand collaboration, announcing the partnership to the public and media outlets.

        Parameters:
            collaboration (dict): A dictionary containing details of the brand collaboration.

        Returns:
            dict: A dictionary representing the created press release.
        """
        """
        Creates a press release for a new brand collaboration or event involving the influencer. This press release can be used to announce the collaboration to the public and generate media interest.

        Parameters:
            collaboration (dict): A dictionary containing details about the brand collaboration or event.

        Returns:
            dict: A dictionary representing the created press release.
        """
        """
        Creates a press release for a specific brand collaboration, announcing the partnership and providing details about the collaboration to the media and public.

        Parameters:
            collaboration (dict): A dictionary containing details about the brand collaboration.

        Returns:
            dict: A dictionary representing the created press release.
        """
        """
        Creates a press release for a new brand collaboration or event involving the influencer. This press release can be distributed to media outlets to increase visibility and awareness.

        Parameters:
            collaboration (dict): A dictionary containing details about the brand collaboration or event.

        Returns:
            dict: A dictionary representing the created press release.
        """
        """
        Creates a press release for a specific brand collaboration, announcing the partnership and providing details about the collaboration.
        This method is essential for public relations and increasing the visibility of the influencer's collaborations.

        Parameters:
            collaboration (dict): A dictionary containing details about the brand collaboration.

        Returns:
            dict: A dictionary representing the created press release.
        """
        """
        Creates a press release for a specific brand collaboration, announcing the partnership and providing details about the collaboration. This press release can be distributed to media outlets to increase visibility and awareness.

        Parameters:
            collaboration (dict): A dictionary containing details about the brand collaboration.

        Returns:
            dict: A dictionary representing the created press release.
        """
        """
        Creates a press release for a new brand collaboration, announcing the partnership to the public and media.
        This method is used to generate buzz and inform the audience about the influencer's latest projects.

        Parameters:
            collaboration (dict): A dictionary containing details about the brand collaboration.

        Returns:
            dict: A dictionary representing the created press release.
        """
        """
        Creates a press release for a new brand collaboration, announcing the partnership to the public and media outlets.
        This method is essential for influencers to generate buzz and publicity for their collaborations.

        Parameters:
            collaboration (dict): A dictionary containing details of the brand collaboration.

        Returns:
            dict: A dictionary representing the newly created press release.
        """
        """
        Creates a press release for a specific brand collaboration, announcing the partnership between the influencer and the brand.
        This press release can be used for media distribution and social media announcements.

        Parameters:
            collaboration (dict): A dictionary containing details of the brand collaboration.

        Returns:
            dict: A dictionary representing the created press release.
        """
        """
        Creates a press release for a new brand collaboration, announcing the partnership between the influencer
        and the brand. This press release can be used for media outreach and promotional purposes.

        Parameters:
            collaboration (dict): A dictionary containing details of the brand collaboration.

        Returns:
            dict: A dictionary representing the created press release.
        """
        """
        Creates a press release for a specific brand collaboration, announcing the partnership between the influencer
        and the brand. This press release can be used for media outreach and promotional purposes.

        Parameters:
            collaboration (dict): A dictionary containing details of the brand collaboration.

        Returns:
            dict: A dictionary representing the created press release.
        """
        """
        Creates a press release for a given brand collaboration, announcing the partnership between the influencer and the brand.
        The press release includes a title, body content, and the date of the collaboration.

        Parameters:
            collaboration (dict): A dictionary containing details of the brand collaboration.

        Returns:
            dict: A dictionary representing the created press release.
        """
        """
        Generates a press release for a given brand collaboration.
        :param collaboration: The brand collaboration details.
        :return: A dictionary representing the press release.
        """
        title = f"{self.userProfile.name} collaborates with {collaboration.brand}"
        body = f"We are excited to announce a new collaboration between {self.userProfile.name} and {collaboration.brand}. Stay tuned for more updates!"
        press_release = {
            "title": title,
            "body": body,
            "date": collaboration.date
        }
        self.pressReleases.insert_one(press_release)
        return press_release

    def monitor_media(self, keyword):
        """
        Monitors media outlets for mentions of specific keywords related to the influencer or brand collaborations.

        Parameters:
            keyword (str): The keyword to search for in media outlets.

        Returns:
            list: A list of headlines containing the keyword.
        """
        """
        Monitors various media outlets for mentions of the influencer or specific keywords related to their brand and activities. This function helps in tracking the influencer's media presence and public perception.

        Parameters:
            keyword (str): The keyword to search for in media outlets.

        Returns:
            list: A list of headlines or articles where the keyword is mentioned.
        """
        """
        Monitors media outlets for mentions of the influencer or related keywords, helping to track the influencer's media presence and public perception.

        Parameters:
            keyword (str): The keyword to search for in media outlets.

        Returns:
            list: A list of headlines or articles where the keyword is mentioned.
        """
        """
        Monitors various media outlets for mentions of the influencer or topics related to their brand collaborations and interests. This method helps in tracking the influencer's media presence and public perception.

        Parameters:
            keyword (str): The keyword or phrase to search for in media outlets.

        Returns:
            list: A list of headlines or articles where the keyword is mentioned.
        """
        """
        Monitors media outlets for mentions of the influencer or related topics, providing insights into public perception and media coverage.

        Parameters:
            keyword (str): The keyword or phrase to search for in media outlets.

        Returns:
            list: A list of headlines or articles where the keyword is mentioned.
        """
        """
        Monitors various media outlets for mentions of the influencer or specific keywords related to their brand or niche. This helps in tracking the influencer's media presence and public perception.

        Parameters:
            keyword (str): The keyword to monitor in media outlets.

        Returns:
            list: A list of headlines or articles where the keyword is mentioned.
        """
        """
        Monitors various media outlets for mentions of specific keywords related to the influencer or brand.
        This method helps in tracking the media presence and public perception of the influencer's brand collaborations.

        Parameters:
            keyword (str): The keyword to search for in media outlets.

        Returns:
            list: A list of headlines or articles where the keyword is mentioned.
        """
        """
        Monitors various media outlets for mentions of specific keywords related to the influencer or brand. This method helps in tracking the media presence and public perception of the influencer's brand collaborations.

        Parameters:
            keyword (str): The keyword to monitor in media outlets.

        Returns:
            list: A list of headlines or articles where the keyword is mentioned.
        """
        """
        Monitors various media outlets for mentions of the influencer or specific keywords related to their brand or niche.
        This method helps in tracking the influencer's media presence and public perception.

        Parameters:
            keyword (str): The keyword to search for in media outlets.

        Returns:
            list: A list of headlines or articles where the keyword was mentioned.
        """
        """
        Monitors media outlets for mentions of the influencer or related keywords. This method helps influencers stay informed
        about their public perception and the reach of their brand collaborations.

        Parameters:
            keyword (str): The keyword to search for in media outlets.

        Returns:
            list: A list of headlines or articles where the influencer or keyword is mentioned.
        """
        """
        Monitors various media outlets for mentions of specific keywords related to the influencer or brand.
        This function is useful for tracking the reach and impact of press releases and other media content.

        Parameters:
            keyword (str): The keyword to monitor in media outlets.

        Returns:
            list: A list of headlines or articles where the keyword is mentioned.
        """
        """
        Searches for media mentions of a specific keyword, which can be the influencer's name, brand name, or any
        relevant term. This method helps in tracking the media presence and public perception of the influencer or brand.

        Parameters:
            keyword (str): The keyword to search for in media articles.

        Returns:
            list: A list of headlines or articles where the keyword is mentioned.
        """
        """
        Searches for media mentions of a specific keyword, which can be the influencer's name, brand name, or any
        relevant term. This method helps in tracking the media presence and public perception of the influencer or brand.

        Parameters:
            keyword (str): The keyword to search for in media articles.

        Returns:
            list: A list of headlines or articles where the keyword is mentioned.
        """
        """
        Searches for media mentions of a given keyword, such as the influencer's name or a brand they are collaborating with.
        This method uses web scraping to gather headlines from news sources, providing insights into media coverage.

        Parameters:
            keyword (str): The keyword to search for in media mentions.

        Returns:
            list: A list of headlines that include the given keyword.
        """
        """
        Monitors media mentions by searching for a given keyword.
        :param keyword: The keyword to search for in media articles.
        :return: A list of media headlines that mention the keyword.
        """
        url = f"https://news.google.com/news?q={keyword}"
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        headlines = soup.find_all('a', {'class': 'DY5T1d'})
        return [headline.text for headline in headlines]
