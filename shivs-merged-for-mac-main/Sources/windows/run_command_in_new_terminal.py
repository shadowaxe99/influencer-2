import subprocess

command = 'your_command_here'
subprocess.Popen(['start', 'cmd', '/k', command], shell=True)