import os
import uuid
import subprocess
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/execute', methods=['POST'])
def execute_code():
    data = request.get_json()
    code = data.get("code", "")
    user_input = data.get("input", "")

    uid = uuid.uuid4().hex
    code_file = f"temp_{uid}.py"
    input_file = f"input_{uid}.txt"

    with open(code_file, "w") as f:
        f.write(code)

    with open(input_file, "w") as f:
        f.write(user_input)

    try:
        result = subprocess.run([
            "python", "runner.py", code_file, input_file
        ], capture_output=True, text=True, timeout=5)

        output = result.stdout + result.stderr
    except subprocess.TimeoutExpired:
        output = "Execution timed out."
    except Exception as e:
        output = f"Error running Docker: {str(e)}"

    os.remove(code_file)
    os.remove(input_file)

    return jsonify({"output": output})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)