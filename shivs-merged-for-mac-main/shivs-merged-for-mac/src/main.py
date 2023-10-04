import pygame
import os
import json
import time
import speech_recognition as sr
import requests
import playsound


pygame.init()


window_width = 800
window_height = 600
window = pygame.display.set_mode((window_width, window_height))
pygame.display.set_caption('Pygame Program')


button_width = 300
button_height = 80
button_color = (0, 128, 0)
button_text = 'Start Chatbot'
button_font = pygame.font.Font(None, 40)
button_text_render = button_font.render(button_text, True, (0, 0, 0))
button_rect = pygame.Rect((window_width - button_width) // 2, (window_height - button_height) // 2, button_width, button_height)



def run_command_in_new_terminal(command):
    current_dir = os.path.dirname(os.path.realpath(__file__))
    subprocess.Popen(['osascript', '-e', f'tell app "Terminal" to do script "cd {current_dir} && {command}"'])



def run_chatbot():
    pygame.display.iconify()
    run_command_in_new_terminal('python gpt_chatbot/chatbot.py')


running = True

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.MOUSEBUTTONDOWN:
            if button_rect.collidepoint(event.pos):
                run_chatbot()

    window.fill((255, 255, 200))
    pygame.draw.rect(window, button_color, button_rect, border_radius=10)
    window.blit(button_text_render, (button_rect.x + (button_width - button_text_render.get_width()) // 2, button_rect.y + (button_height - button_text_render.get_height()) // 2))
    pygame.display.update()
