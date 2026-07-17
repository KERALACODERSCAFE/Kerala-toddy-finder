.PHONY: help setup build up down restart logs migrate makemigrations shell collectstatic loaddata

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

setup: ## Initialize the project for local development (pre-commit, docker build, migrations)
	uv sync
	uv tool run pre-commit install
	docker compose up -d --build
	docker compose exec backend uv run python manage.py migrate
	docker compose exec backend uv run python manage.py collectstatic --no-input
	@echo "Setup complete! The API is running at http://localhost:8000"

build: ## Build the docker containers
	docker compose build

up: ## Start the containers in the background
	docker compose up -d

down: ## Stop and remove the containers
	docker compose down

restart: ## Restart the containers
	docker compose restart

logs: ## View the logs of the containers
	docker compose logs -f

migrate: ## Run Django database migrations
	docker compose exec backend uv run python manage.py migrate

makemigrations: ## Create new Django migrations
	docker compose exec backend uv run python manage.py makemigrations

shell: ## Open an interactive Django shell
	docker compose exec backend uv run python manage.py shell

collectstatic: ## Collect static files for production/WhiteNoise
	docker compose exec backend uv run python manage.py collectstatic --no-input

loaddata: ## Load the initial core fixture data
	docker compose exec backend uv run python manage.py loaddata core/fixtures/initial_data.json
