calculator_tool = {
    "type": "function",
    "function": {
        "name": "calculator",
        "description": "Perform mathematical calculations.",

        "parameters": {
            "type": "object",
            "properties": {
                "operation": {
                    "type": "string",
                    "enum": [
                        "add",
                        "subtract",
                        "multiply",
                        "divide"
                    ]
                },

                "a": {
                    "type": "number"
                },

                "b": {
                    "type": "number"
                }
            },

            "required": [
                "operation",
                "a",
                "b"
            ]
        }
    }
}