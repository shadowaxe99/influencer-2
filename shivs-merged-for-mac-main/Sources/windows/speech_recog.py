import speech_recognition as sr
from interpreter.interpreter import Interpreter
import keyboard
import json

import whisper
model = whisper.load_model("base")

#try loading resp.txt
try:
    with open("resp.json", "r") as file:
        context = json.load(file)
except:
    print("No Context Found")

interpreter = Interpreter(auto_run = True, messages = context)

def listen_microphone():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        audio = r.listen(source)

    try:
        print("Recognizing...")
        # audio.export("audio.wav", format="wav")
        # result = model.transcribe("audio.wav")
        # text = str(result["text"])
        text = sr.recognize_google(audio)
        print(f"Text: {text}")
        resp = interpreter.chat(str(text), return_messages = True)
        # with open("resp.json", "w") as file:
        #     json.dump(resp, file)
    except sr.UnknownValueError:
        print("Could not understand audio")
    except sr.RequestError as e:
        print(f"Error: {e}")

while True:
    listen_microphone()