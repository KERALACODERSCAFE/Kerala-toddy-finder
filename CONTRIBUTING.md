# Contributing to Kerala Toddy Finder

Thank you for your interest in contributing to the Kerala Toddy Finder project! We welcome contributions from everyone. Below are guidelines to help you get started.

## Requirements
- Python 3.x
- Django 3.x
- Node.js 14.x or higher
- npm 6.x or higher

## Setup Instructions
### Django Backend
1. Clone the repository:
   ```bash
   git clone https://github.com/KERALACODERSCAFE/Kerala-toddy-finder.git
   cd Kerala-toddy-finder/toddy_shop_backend
   ```

2. Install UV:
   Install uv based on your platform by following the instructions here: https://docs.astral.sh/uv/getting-started/installation

3. Create a virtual environment:
   ```bash
   uv venv
   ```

4. Activate the virtual environment:
   ```bash
   source .venv/bin/activate  # macOS/Linux

   # On Windows use `.venv\Scripts\activate`
   ```

5. Install dependencies:
   ```bash
   uv sync
   ```

6. Run the development server:
   ```bash
   uv run python manage.py runserver
   ```

### Node.js Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm start
   ```

## Code Standards
- Follow [PEP 8](https://www.python.org/dev/peps/pep-0008/) for Python code.
- Use [Prettier](https://prettier.io/) for formatting JavaScript files.

## Pull Request Process
1. Fork the repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Create a pull request to the main repository.

## Code of Conduct
Please adhere to our [Code of Conduct](https://github.com/KERALACODERSCAFE/Kerala-toddy-finder/blob/main/CODE_OF_CONDUCT.md) in all interactions. Treat everyone with respect and contribute to a positive community.

---

We look forward to your contributions!