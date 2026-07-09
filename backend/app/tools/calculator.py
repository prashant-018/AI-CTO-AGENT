from typing import Union


class CalculatorTool:

    @staticmethod
    def add(a: float, b: float) -> float:
        return a + b

    @staticmethod
    def subtract(a: float, b: float) -> float:
        return a - b

    @staticmethod
    def multiply(a: float, b: float) -> float:
        return a * b

    @staticmethod
    def divide(a: float, b: float) -> Union[float, str]:

        if b == 0:
            return "Cannot divide by zero."

        return a / b


calculator = CalculatorTool()