from gpt_chatbot.chatbot import Chatbot
from voice_command import VoiceCommandParser
from vpet import ButlerAssistant
from interpreter import CodeInterpreter


class MainProgram:
    def __init__(self):
        self.chatbot = Chatbot()
        self.voice_parser = VoiceCommandParser()
        self.butler = ButlerAssistant('Jeeves')
        self.interpreter = CodeInterpreter()

    def run(self):
        print("Welcome to the AI Assistant!")
        while True:
            input_text = input("You: ")
            if input_text.lower() == "quit":
                break
            elif input_text.lower().startswith('voice command: '):
                command = input_text[len('voice command: '):]
                self.voice_parser.execute_command(command)
            elif input_text.lower().startswith('butler task: '):
                task = input_text[len('butler task: '):]
                self.butler.perform_task(task)
            elif input_text.lower().startswith('python code: '):
                code = input_text[len('python code: '):]
                result = self.interpreter.interpret(code)
                print("Result: ", result)
            else:
                response = self.chatbot.generate_response(input_text)
                print("Chatbot: ", response)


if __name__ == '__main__':
    program = MainProgram()
    program.run()