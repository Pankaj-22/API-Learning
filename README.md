# API-Learning  ( IN PROGRESS .....)

# API for MySQL Database
created an api to perform different db operations on MySQL db 

# Index page
dislpaying All dummy customer information
here, I am using javascript (index.js) to featch cutomer data

# To Run
databaseAPI> flask --app main run --host 0.0.0.0
run main.py 
python main.py or python3 main.py (depend on how env variable is set)
and 
open/host index.html in a web browser

# Running by Docker
## Create Docker Network
docker network create localDockerNet --driver bridge
docker network inspect localDockerNet

## Create DataBase container
cmd> docker pull mysql
cmd> docker run -dit --name mysqldbServer --network localDockerNet -e MYSQL_ROOT_PASSWORD=123 -p 3306:3306 mysql
can connect any docker container by Eg :- docker network connect localDockerNet mysqldbServer

## Configure Database
Run mysql container connect to the msql service via sql tool(Dbever)

Configs --> hostname:localhost:3306(depend on which port db services are running) user:root(in case of MySQL) passwd:MYSQL_ROOT_PASSWORD(whatever you set when creating the container)
create database and Tables

## Create API Container
docker build -t flask-api-app:1.0.version ./path of your DOCKERFILE

docker run -dit --name flaskApiContainer --network localDockerNet -p 5000:5000 flask-api-app:1.0.version

## Create WEB Interface for API
docker build -t api-web-interface:1.0.version ./path of your DOCKERFILE

docker run -dit --rm --name apiWebInterface -p 5500:80 api-web-interface:1.0.version

----------------------------------------------DONE------------------------------------------------
