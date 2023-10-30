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