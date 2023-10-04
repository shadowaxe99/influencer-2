import unittest
from voice_command import parseVoiceCommand
from frontend_action import FrontendAction


class TestVoiceCommand(unittest.TestCase):
    def test_parse_voice_command(self):
        voice_command = 'open the door'
        expected_action = FrontendAction('open_door')

        action = parse_voice_command(voice_command)

        self.assertEqual(action, expected_action)


if __name__ == '__main__':
    unittest.main()
