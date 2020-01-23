# Ebay Alerts API

This is a projetct that uses Nodejs, Express, Typescript, MongoDB and Redis to create products alerts in ebay within an specific keyword, interval and e-mail, so this way the "user" will recieve in his e-mail 3 products sorted by the lowest price according to the inverval of the alert.

## Requirements

To run this project you must have:

- Nodejs 10.0 or higher
- Docker 19.03.5
- Docker Compose 1.24.1
- Yarn 1.19.2 or higher

## Enviroment

You must rename `.env.example` to `.env` and replace all the variables values.

## Docker

This projet uses docker for the Database and Queue control, and it has two containers:

- db_mongo - MongoDB Instance
- redis - Redis Instance

## Instalation

- Clone this repository
- Run `yarn` to install all the dependecies
- Run `docker-compose up -d`

## Tests

The project contains integration tests, i'm using Jest and all tests are in the \_\_tests\_\_ folder. To run the them execute the command below:

```
$ yarn test
```

## Routes

The API has the routes below:

- `GET` /alerts - return all alerts
- `POST` /alerts - create an alert
- `PUT` /alerts/:id - update an alert by his id (\_id on Mongo)
- `DELETE` /alerts/:id - delte and alert by his id
- `GET` /admin/queues - BullBoard Dashboard to wacth the queue in real-time

## Development (Enviroment)

To run the API as development enviroment you must execute:

```
$ yarn dev
```

## Production (Enviroment)

To run the API as production enviroment you must execute:

```
$ yarn start
```

### NOTE:

If you are using windows, you must copy manually the `views` folder inside `src` to `dist` folder.

## Libs and Packages

The project uses the libs and packages below:

- bull - to generate, execute and control queues
- bull-boad - UI real-time of the queues
- eslint - control and fix code style and good pratices
- cors - to allow connections for different origins
- ebay-node-api - To get the products of ebay
- faker - to generate random data for testing
- nodemailer - to send e-mails
- nodemailer-express-handlebars - generate e-mails templates
- mongoose - to create schema, and connect with the MongoDB
