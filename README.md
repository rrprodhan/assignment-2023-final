<h2 align="center">Assignment 2023 Final</h2>

---

<p align="center"> Final Assignment for the Senior Software Engineer/Software Engineer (Node.js, Angular) position at S3 Innovate PTE LTD
    <br> 
</p>

# Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [API Documentation](#api_doc)
- [Built Using](#built_using)
- [Authors](#authors)

# About <a name = "about"></a>

The objective of this project is building a very simple restful API system (just Backend) to allow users to get/create/update/delete locations.

# 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

What things you need to install the software and how to install them.

```
Node.js version v19.8.1, PostgreSQL version v13.4
```

## Installing

1. Clone the repository:
```
git clone https://github.com/rrprodhan/assignment-2023-final.git
```
2. Install dependencies:
```
cd assignment-2023-final
npm install
```
3. Rename the existing .env.sample file to .env: https://github.com/rrprodhan/assignment-2023-final/blob/main/.env.sample, or create a .env file in the project root directory and copy the contents from .env.sample file to the .env file and change the database connection configuration according to your database settings:
```
DATABASE_CONNECTION_DATABASE=location-db
DATABASE_CONNECTION_USERNAME=postgres
DATABASE_CONNECTION_PASSWORD=postgres
```
4. Set up the database:
- To create a database named location-db in PGAdmin or PostgreSQL, follow these steps:
- Open PGAdmin or PostgreSQL and connect to your server.
- Right-click on the Databases folder and select Create > Database.
- In the Create Database dialog box, enter location-db as the name of the database.
- Set the owner of the database to a user with appropriate privileges.
- Click the Save button to create the database.

Or,

- Alternatively, you can use SQL commands to create the database. Open the SQL editor in PGAdmin or PostgreSQL and enter the following command:
```
CREATE DATABASE location-db;
```
- To add a user with privileges to the location-db database, you can use the following SQL command:
```
CREATE USER username WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE "location-db" TO postgres;
```
- Replace username with the desired username and password for the user. The GRANT ALL PRIVILEGES command grants the user all privileges on the   location-db database.
- Execute the SQL command in PGAdmin or PostgreSQL to create the user and grant privileges to the database.
5. Run the migration to create the database tables and seed data into them:
```
npx knex migrate:latest
npx knex seed:run
```
6. Start the server:
```
npm run start:dev
```

# API Documentation <a name="api_doc"></a>

## Locations API Endpoints

### Get All Locations
```
GET /api/locations
```
### Query Parameters:
- `filter` (optional): Filter locations by properties.
- `id` (optional, number): Filter by location id.
- `locationName` (optional, string): Filter by location name.
- `locationNumber` (optional, string): Filter by location number.
- `locationArea` (optional, number): Filter by location area.
- `buildingId` (optional, number): Filter by building ID.
```
Example: /api/locations?filter[locationName]=Location1&filter
[locationArea]=100
```
### Response:
```
Status Code: 200 OK
Body: Array of LocationsDto objects
```

### Get a location by ID
```
GET /api/locations/:id
```
### Parameters:
- `id` (required, number): ID of the location to retrieve.
### Response:
```
Status Code: 200 OK
Body: LocationsDto object
```

### Create a new location
```
POST /api/locations
```
### Request Body:
- `locationName` (required, string): Name of the location.
- `locationNumber` (required, string): Number of the location.
- `locationArea` (required, number): Area of the location.
- `buildingId` (required, number): ID of the building associated with the location.
### Response:
```
Status Code: 201 Created
Body: Array of location IDs
```

### Update a location by ID
```
PUT /api/locations/:id
```
### Parameters:
- `id` (required, number): ID of the location to update.
### Request Body:
- `locationName` (optional, string): Updated name of the location.
- `locationNumber` (optional, string): Updated number of the location.
- `locationArea` (optional, number): Updated area of the location.
- `buildingId` (optional, number): Updated ID of the building associated with the location.
### Response:
```
Status Code: 200 OK
Body: Array of location IDs
```

### Delete a location by ID.
```
DELETE /api/locations/:id
```
### Parameters:
- `id` (required, number): ID of the location to delete.
### Response:
```
Status Code: 200 OK
Body: true if the location was deleted successfully, otherwise false
```

## Building API Endpoints

### Get All Buildings
```
GET /api/buildings
```
### Query Parameters:
- `filter` (optional): Filter locations by properties.
- `id` (optional, number): Filter by building id.
- `buildingName` (optional, string): Filter by building name.
```
Example: /api/buildings?filter[buildingName]=Building1
```
### Response:
```
Status Code: 200 OK
Body: Array of BuildingsDto objects
```

### Get a building by ID
```
GET /api/buildings/:id
```
### Parameters:
- `id` (required, number): ID of the building to retrieve.
### Response:
```
Status Code: 200 OK
Body: BuildingsDto object
```

### Create a new building
```
POST /api/buildings
```
### Request Body:
- `buildingName` (required, string): Name of the building.
### Response:
```
Status Code: 201 Created
Body: Array of building IDs
```

### Update a building by ID
```
PUT /api/buildings/:id
```
### Parameters:
- `id` (required, number): ID of the building to update.
### Request Body:
- `buildingName` (optional, string): Updated name of the building.
### Response:
```
Status Code: 200 OK
Body: Array of building IDs
```

### Delete a building by ID.
```
DELETE /api/buildings/:id
```
### Parameters:
- `id` (required, number): ID of the building to delete.
### Response:
```
Status Code: 200 OK
Body: true if the building was deleted successfully, otherwise false
```

## ⛏️ Built Using <a name = "built_using"></a>

- [NodeJs](https://nodejs.org/en/) - Server Environment
- [NestJS](https://nestjs.com/) - Backend Framework
- [Typescript](https://www.typescriptlang.org/) - Programming Language
- [PostgreSQL](https://www.postgresql.org/) - Database Management System
- [Knex.js](https://knexjs.org/) - SQL Query Builder

## ✍️ Authors <a name = "authors"></a>

- [Raiyan Rashid Prodhan](https://github.com/rrprodhan) - All project work
