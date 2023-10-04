import subprocess


def run_command_in_new_terminal(command):
    subprocess.Popen(['start', 'cmd', '/c', 'start /min cmd /k ' + command], shell=True)
