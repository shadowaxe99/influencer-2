
# Merged Project: Pet-Therapy and Open-Interpreter

This project aims to integrate the Pet-Therapy virtual pet functionality with the Open-Interpreter conversational backend.

## Installation

- For Pet-Therapy: Open the `Sources` folder in Xcode and run the project.
- For Open-Interpreter: Run `poetry install` in the `interpreter` folder.

## Integration Steps

1. Initialize Open-Interpreter in `main.swift` of Pet-Therapy.
2. Replace pet behaviors in `PetEntity.swift` based on Open-Interpreter's output.
3. Handle voice I/O around Open-Interpreter.

## Additional Features

- Voice assistant capabilities
- Mouse control using macOS APIs
