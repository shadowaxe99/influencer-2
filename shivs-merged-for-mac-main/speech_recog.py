import speech_recognition as sr
from interpreter.interpreter import Interpreter
import json

interpreter = Interpreter(auto_run = True, debug_mode = False)

def listen_microphone():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        audio = r.listen(source)

    try:
        print("Recognizing...")
        text = r.recognize_google(audio)
        print(f"Text: {text}")
        resp = interpreter.chat(str(text), return_messages = True)
    except sr.UnknownValueError:
        print("Could not understand audio")
    except sr.RequestError as e:
        print(f"Error: {e}")

while True:
    listen_microphone()