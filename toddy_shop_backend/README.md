# Toddy Shop Backend (DRF)

This backend uses [uv](https://docs.astral.sh/uv/) for dependency and environment management.

## Prerequisites

- Python 3.12+
- uv installed

## Install UV

Install uv based on your platform by following the instructions here:

https://docs.astral.sh/uv/getting-started/installation


## Setup

After cloning the repository,

Copy the `.env.example` file to `.env` and update the environment variables as needed after that run these commands from the backend folder:

```bash
cd toddy_shop_backend
uv venv
```

This creates a virtual environment in `.venv` in the backend folder.

```bash
source .venv/bin/activate  # macOS/Linux

# On Windows use `.venv\Scripts\activate`
```

This activates the virtual environment.

Then install dependencies:

```bash
uv sync
```

## Run The Project

Apply migrations:

```bash
uv run python manage.py migrate
```


Load the initial fixture data to populate required lookup and master tables:
```bash
uv run python manage.py loaddata core/fixtures/initial_data.json
```
This Ensures the following database has essential default data


Or You can run one line command

```bash
uv run python manage.py migrate && uv run python manage.py loaddata core/fixtures/initial_data.json
```

Start development server:

```bash
uv run python manage.py runserver
```

Run Django checks:

```bash
uv run python manage.py check
```

## Dependency Workflow

Add a dependency:

```bash
uv add <package-name>
```

Remove a dependency:

```bash
uv remove <package-name>
```

Update requirements.txt:

```bash
uv export --frozen --output-file=requirements.txt
```

---
