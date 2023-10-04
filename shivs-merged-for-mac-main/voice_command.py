import subprocess


def parseVoiceCommand(voiceCommand):
    # Implementation of parsing the voice command and returning the corresponding action
    pass


def run_command_in_new_terminal(command):
    current_dir = os.path.dirname(os.path.realpath(__file__))
    subprocess.Popen(['osascript', '-e', f'tell app "Terminal" to do script "cd {current_dir} && {command}"'])
