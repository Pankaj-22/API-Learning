FROM python:3.9.20-slim

WORKDIR /usr/src/app

COPY requirements.txt ./

RUN pip install --no-cache-dir --upgrade pip \
  && pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD [ "flask","--app","main", "run" , "--host", "0.0.0.0" ]