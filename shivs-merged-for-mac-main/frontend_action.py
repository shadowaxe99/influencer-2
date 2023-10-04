class FrontendAction:
    def __init__(self, action):
        self.action = action

    def trigger(self):
        print(f'Triggering frontend action: {self.action}')

    def __eq__(self, other):
        if isinstance(other, FrontendAction):
            return self.action == other.action
        return False