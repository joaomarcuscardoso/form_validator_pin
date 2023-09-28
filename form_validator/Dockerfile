# pull official base image
FROM python:3.11.4-slim-buster

# set work directory
WORKDIR . /app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

RUN apt-get update && apt-get install -y netcat poppler-utils

COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g' ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# copy project
COPY . .

ENTRYPOINT ["/app/entrypoint.sh"]
