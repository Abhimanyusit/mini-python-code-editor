import sys
import io

with open("code.py") as f:
    code = f.read()

with open("input.txt") as f:
    inputs = f.read().splitlines()

# Setup fake input and output capture
sys.stdin = io.StringIO("\n".join(inputs))
output_buffer = io.StringIO()
real_stdout = sys.stdout
real_stderr = sys.stderr
sys.stdout = output_buffer
sys.stderr = output_buffer

# Custom input simulation
prompted_inputs = []
input_counter = 0

def fake_input(prompt=""):
    global input_counter
    if input_counter < len(inputs):
        user_input = inputs[input_counter]
        prompted_inputs.append(f"{prompt}{user_input}")
        input_counter += 1
        return user_input
    return ""

__builtins__.input = fake_input

try:
    exec(code, {})
except Exception as e:
    print("Error:", e)

# Restore stdout/stderr
sys.stdout = real_stdout
sys.stderr = real_stderr

# Combine input prompts with output
final_output = ""
if prompted_inputs:
    final_output += "\n".join(prompted_inputs) + "\n"
final_output += output_buffer.getvalue()
print(final_output)