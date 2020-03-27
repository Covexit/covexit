.DEFAULT_GOAL := run

init:
	(cd ./frontend && npm install)
	pip install pipenv
	pipenv install --dev
	pipenv run ./backend/manage.py migrate

run:
	trap 'kill %1' SIGINT; \
	pipenv run ./backend/manage.py runserver & \
	(cd ./frontend && npm run start)
