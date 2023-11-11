<<<<<<< HEAD
```python
class Budget:
    def __init__(self, dev_time, resources, testing_cost, additional_features_cost):
        self.dev_time = dev_time
        self.resources = resources
        self.testing_cost = testing_cost
        self.additional_features_cost = additional_features_cost

    def calculate_budget(self):
        dev_cost = self.dev_time * self.resources
        total_cost = dev_cost + self.testing_cost + self.additional_features_cost
        return total_cost

# Estimated development time in hours
dev_time = 500

# Cost of resources per hour
resources = 50

# Cost of testing
testing_cost = 10000

# Cost of additional features
additional_features_cost = 5000

budget = Budget(dev_time, resources, testing_cost, additional_features_cost)
total_budget = budget.calculate_budget()

print(f"The total budget for the project is: ${total_budget}")
```
=======
class Budget:
    def __init__(self, initial_budget):
        self.initial_budget = initial_budget
        self.expenses = []
        self.income = []

    def add_expense(self, amount):
        """Add an expense to the budget."""
        self.expenses.append(amount)

    def add_income(self, amount):
        """Add income to the budget."""
        self.income.append(amount)

    def calculate_total(self):
        """Calculate the total budget."""
        total_expenses = sum(self.expenses)
        total_income = sum(self.income)
        return self.initial_budget + total_income - total_expenses

# Example usage:
# budget = Budget(10000)
# budget.add_expense(200)
# budget.add_income(500)
# total_budget = budget.calculate_total()
>>>>>>> ac62b9b (Initial commit)
