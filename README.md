# Express Blog Boilerplate
This is a blog API boilerplate built using Express.js, MongoDB (Mongoose), Joi for validation and Swagger for API documentation.

#### Demo: 
https://express-blog-boilerplate.onrender.com/doc

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Postman Collection](#postman-collection)
- [VSCode Settings](#vscode-settings)
- [License](#license)

## Overview

This boilerplate provides a foundation for building a blog API using Express.js and MongoDB. It includes user authentication, post management, API documentation using Swagger, error handling, and logging.

## Installation

1. Clone the repository:
2. Navigate to the project directory:
   ```bash
   cd express-blog-boilerplate
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file based on the provided `.env.sample` file.
2. Set up your MongoDB database URL in the `.env` file.
3. Set other environment variables as needed.

## Usage

1. Start the server:
   ```bash
   npm start
   ```
    for development:
   ```bash
   npm run dev
   ```
2. Generate Swagger API documentation (old swagger-output.json file will be overwritten!):
   ```bash
   npm run swagger
   ```

3. Access the API documentation at `http://localhost:3000/doc`.

4. To create an admin user initially:
   - Use CLI:
     ```bash
     node ./utils/createAdmin.js -p <ADMIN_PASSWORD> -u <ADMIN_USERNAME>
     ```
   - Or set the following values in the `.env` file:
     ```dotenv
     CREATE_ADMIN_INITIALLY=true
     ADMIN_USERNAME=admin
     ADMIN_PASSWORD=password
     ```

## Features

- User authentication using JWT (JSON Web Tokens).
- CRUD operations for posts.
- Request validation using Joi package.
- Error handling middleware for consistent error responses.
- Logging using Pino for production-ready logs.
- Swagger API documentation using `swagger-ui-express`.
- Create an admin user initially based on configuration.

## Folder Structure

- `middlewares/`: Contains custom middleware functions such as validator, token verification, error handler, and response handler.
- `utils/`: Includes utility functions such as logger and creating an admin user.
- `models/`: Defines Mongoose schemas for MongoDB models (e.g., User, Post).
- `validators/`: Contains Joi validation schemas for request validation. (You can validate request's body and query params here)
- `routes/`: Defines route handlers for different API endpoints (e.g., user routes, post routes).
- `app.js`: Main entry point for the Express application.
- `swagger.js`: Script to generate Swagger API documentation.
- `swagger-output.json`: Output file for generated Swagger documentation.
- `.env`: Environment variables configuration file.
- `.vscode/`: Contains VSCode settings and extensions configuration.
- `package.json`: Contains project metadata and scripts.

## Postman Collection

Included in this repository is a Postman collection file (`express-boilerplate-blog.postman_collection.json`) to facilitate testing and documentation of the API endpoints. Import this collection into Postman to get started.

## VSCode Settings
Install the recommended extensions:
   - ESLint by Dirk Baeumer (`dbaeumer.vscode-eslint`)
   - Prettier - Code formatter by Esben Petersen (`esbenp.prettier-vscode`)


## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/muzafferkadir/express-blog-boilerplate/blob/main/LICENCE) file for details.
