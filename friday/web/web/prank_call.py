import os
import time


def prank_call(number):
    os.system(f'echo "This is a prank call" | sendmail {number}')


def main():
    print("Welcome to Prank Call!")
    number = input("Enter the phone number: ")
    prank_call(number)
    print("Prank call sent!")


if __name__ == '__main__':
    main()