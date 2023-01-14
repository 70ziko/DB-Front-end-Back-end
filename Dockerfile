FROM python:3.9-alpine

ENV PYTHONUNBUFFERED 1

RUN apk update && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add postgresql-dev

COPY . /code/

RUN pip install --upgrade pip

RUN source /home/paris/projekty/DB/DB-Front-end-Back-end/.venv/bin/activate

RUN pip install -r /home/paris/projekty/DB/DB-Front-end-Back-end/code/requirements.txt

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
