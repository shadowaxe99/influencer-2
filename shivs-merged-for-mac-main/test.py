class Test:
    def __init__(self, voice_command, expected_output):
        self.voice_command = voice_command
        self.expected_output = expected_output

    def run(self):
        actual_output = self.voice_command.parse()
        return actual_output == self.expected_output