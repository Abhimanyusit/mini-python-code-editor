# Mini Python Code Editor

A web-based Python code editor and runner. Write, edit, and execute Python code directly in your browser with motivational tips!

## Features

- **Code Editor**: Syntax-highlighted Python editor powered by CodeMirror.
- **Input Support**: Provide custom input for your Python scripts.
- **Terminal Output**: See your program's output in a styled terminal window.
- **Motivational Quotes**: Get a new Python tip or motivational quote each run.
- **Save Code**: Download your code as a `.py` file.
- **Clear Functions**: Easily clear code, input, and output areas.

## Project Structure

```
.
├── backend/
│   ├── app.py           # Flask API server
│   ├── runner.py        # Python code runner with input/output capture
│   └── requirements.txt # Backend dependencies
├── frontend/
│   ├── public/          # Static assets and HTML template
│   ├── src/             # React app source code
│   └── package.json     # Frontend dependencies and scripts
├── Dockerfile           # Container setup for backend
├── .dockerignore
├── .gitignore
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (for frontend)
- [Python 3.10+](https://www.python.org/) (for backend)
- [pip](https://pip.pypa.io/)
- [Docker](https://www.docker.com/) (optional, for containerized backend)

---

### 1. Backend Setup

```sh
cd backend
pip install -r requirements.txt
python app.py
```

The backend will start on [http://localhost:8080](http://localhost:8080).

---

### 2. Frontend Setup

```sh
cd frontend
npm install
npm start
```

The frontend will start on [http://localhost:3000](http://localhost:3000).

---

### 3. Usage

- Write Python code in the editor.
- Enter any required input in the input box.
- Click **Run** to execute your code.
- View output in the terminal window.
- Save your code with the **Save** button.

---

### 4. Docker (Optional)

To run the backend in Docker:

```sh
docker build -t mini-python-backend .
docker run -p 8080:8080 mini-python-backend
```

---

## Credits

- [React](https://reactjs.org/)
- [CodeMirror](https://codemirror.net/)
- [xterm.js](https://xtermjs.org/)
- [Flask](https://flask.palletsprojects.com/)
