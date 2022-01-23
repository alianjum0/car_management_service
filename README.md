# RESTful api setup for Car Management Service
A basic project for building NodeJS RESTful API using Node.js, Express and
TypeScript. 

* [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and [Swagger-ui-express](https://github.com/scottie1984/swagger-ui-express) is used for API Documentation.
* [Jest](https://jestjs.io) is used for unit testing.
* [dotenv](https://github.com/motdotla/dotenv) is used for enviroment variables.
* [helmet](https://helmetjs.github.io) is used for HTTP header security.
* Dockerized development.

## Requirements
* Typescript
* Framework of choice
* Authentication is based on HTTP header with user ID, no need to implement users.
* REST endpoints to add, update, delete, list user’s cars.
* Tests
* Documentation
* Dockerfile

## Quick Start
### Running locally
```
# Installing all packages
npm install

# Build TypeScript to JavaScript
npm run build

# Running the app on port 3000
npm start
```

### Testing
```
npm test
```

### Docker
```
# Building the image
docker build . -t alianjum0/car-management-service

# Running the container
docker run --name car-management-service -p 3000:3000 -d alianjum0/car-management-service:latest 
```

## Project Structure

```
src\
 |--api\            # Swagger file
 |--car\            # Car interface, route and service
 |--common\         # Common functions
 |--middleware\     # middle for error and authentication
 |--index.js        # App entry point
```

## API Documentation
To view the list of available APIs and their specifications, run the server and go to http://localhost:3000/api/docs in your browser. This documentation page is generated  by the defination written swagger.json file.

**Car routes**:\
`POST /api/cars` - create a car\
`GET /api/cars` - get all cars\
`GET /api/cars/:carId` - get car\
`PUT /api/cars/:carId` - update car\
`DELETE /api/cars/:carId` - delete car

## Authorization
The authorization is done using `userid` in HTTP headers e.g. 1

In the swagger api the authentication header can be added by `Authorize` button
in top right.

## License

[MIT](LICENSE)
