.PHONY: default run migrate build
# Variables
APP_NAME=form_validator

# Tasks
default: run

run:
	env/bin/python form_validator/manage.py runserver 
migrate:
	env/bin/python form_validator/manage.py migrate

