# Mini Python Code Editor

A web-based mini Python code editor and runner. Write, edit, and execute Python code in your browser with real-time output, powered by Docker for secure code execution.

## Features

- **Code Editor:** Syntax-highlighted Python editor using CodeMirror.
- **Terminal Output:** Interactive terminal-like output window using xterm.js.
- **Custom Input:** Enter custom input for your Python programs.
- **Safe Execution:** Code runs in an isolated Docker container on the backend.
- **Clear Output:** Easily clear terminal output.

## Project Structure

```
.
├── backend/
│   ├── app.py                # Flask API server
│   ├── requirements.txt      # Backend dependencies
│   └── docker_runner/
│       ├── Dockerfile        # Docker image for code execution
│       └── runner.py         # Python runner script inside Docker
├── frontend/
│   ├── src/                  # React frontend source code
│   ├── public/               # Static assets
│   └── package.json          # Frontend dependencies and scripts
└── .gitignore
```

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/) (for frontend)
- [Python 3](https://www.python.org/) (for backend)

---

### 1. Build the Docker Image

Navigate to `backend/docker_runner` and build the Docker image:

```sh
cd backend/docker_runner
docker build -t python-runner-image .
```

---

### 2. Start the Backend

Install Python dependencies and run the Flask server:

```sh
cd ../../backend
pip install -r requirements.txt
python app.py
```

The backend will start on [http://localhost:5000](http://localhost:5000).

---

### 3. Start the Frontend

Install dependencies and start the React app:

```sh
cd ../frontend
npm install
npm start
```

The frontend will start on [http://localhost:3000](http://localhost:3000).

---

## Usage

1. Write your Python code in the editor.
2. (Optional) Enter input for your program in the input box.
3. Click **Run** to execute the code.
4. View the output in the terminal window.

---

## Security

- All code execution is sandboxed inside a Docker container.
- The backend does not persist code or input files after execution.

---

## Acknowledgements

- [React](https://reactjs.org/)
- [CodeMirror](https://codemirror.net/)
- [xterm.js](https://xtermjs.org/)
- [Flask](https://flask.palletsprojects.com/)
