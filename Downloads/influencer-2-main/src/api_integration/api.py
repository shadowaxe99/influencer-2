import requests
from src.shared_dependencies import UserProfileSchema, BrandCollaborationSchema, ContentIdeaSchema, PressReleaseSchema, LegalAdviceSchema, ContactSchema, AppointmentSchema, StrategyInsightSchema, PostPerformanceSchema

class APIIntegration:
    def __init__(self, api_key, base_url):
        self.api_key = api_key
        self.base_url = base_url

    def get_data(self, endpoint):
        headers = {'Authorization': f'Bearer {self.api_key}'}
        response = requests.get(f'{self.base_url}/{endpoint}', headers=headers)
        return response.json()

    def post_data(self, endpoint, data):
        headers = {'Authorization': f'Bearer {self.api_key}'}
        response = requests.post(f'{self.base_url}/{endpoint}', headers=headers, json=data)
        return response.json()

    def update_data(self, endpoint, data):
        headers = {'Authorization': f'Bearer {self.api_key}'}
        response = requests.put(f'{self.base_url}/{endpoint}', headers=headers, json=data)
        return response.json()

    def delete_data(self, endpoint):
        headers = {'Authorization': f'Bearer {self.api_key}'}
        response = requests.delete(f'{self.base_url}/{endpoint}', headers=headers)
        return response.json()

def integrateAPIs(api_integration):
    userProfile = UserProfileSchema(api_integration.get_data('userProfile'))
    brandCollaborations = BrandCollaborationSchema(api_integration.get_data('brandCollaborations'))
    contentIdeas = ContentIdeaSchema(api_integration.get_data('contentIdeas'))
    pressReleases = PressReleaseSchema(api_integration.get_data('pressReleases'))
    legalAdvice = LegalAdviceSchema(api_integration.get_data('legalAdvice'))
    contactDatabase = ContactSchema(api_integration.get_data('contactDatabase'))
    appointmentSchedule = AppointmentSchema(api_integration.get_data('appointmentSchedule'))
    strategyInsights = StrategyInsightSchema(api_integration.get_data('strategyInsights'))
    postPerformance = PostPerformanceSchema(api_integration.get_data('postPerformance'))
    return {
        'userProfile': userProfile,
        'brandCollaborations': brandCollaborations,
        'contentIdeas': contentIdeas,
        'pressReleases': pressReleases,
        'legalAdvice': legalAdvice,
        'contactDatabase': contactDatabase,
        'appointmentSchedule': appointmentSchedule,
        'strategyInsights': strategyInsights,
        'postPerformance': postPerformance
    }
