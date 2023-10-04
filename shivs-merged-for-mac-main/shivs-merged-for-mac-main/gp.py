import subprocess


def run_gp_command(command):
    current_dir = os.path.dirname(os.path.realpath(__file__))
    subprocess.Popen(['osascript', '-e', f'tell app "Terminal" to do script "cd {current_dir} && {command}"'])
