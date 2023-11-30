class ButlerAssistant:
    def __init__(self, name):
        self.name = name

    def perform_task(self, task):
        print(f"{self.name} is performing the task: {task}")

    def tell_joke(self):
        print(f"{self.name} tells a joke.")

    def provide_fact(self):
        print(f"{self.name} provides a fact.")

    def get_status(self):
        return f"{self.name} is ready to assist you."