# Mock Premier League API
The Mock Premier League API is a RESTful API designed to provide backend services for managing a mock Premier League football competition. It allows users to perform various actions such as creating and managing teams, scheduling and updating fixtures, and registering and authenticating users.

### Table of Contents
* Features
* Technologies Used
* Installation
* Usage
* API Endpoints
* Authentication

### Features
* Team Management: Allows users to create, update, and delete teams participating in the mock Premier League.
* Fixture Management: Enables users to schedule, complete, and edit fixture results for the matches.
* User Authentication: Provides endpoints for user registration and login to access protected routes.
* Search and Filtering: Supports searching and filtering fixtures based on various criteria such as team name, date range, and status.

### Technologies Used
* Node.js (TypeScript): Backend JavaScript runtime environment.
* Express.js: Web application framework for Node.js.
* MongoDB: NoSQL database for storing application data.
* Mongoose: MongoDB object modeling for Node.js.
* JWT (JSON Web Tokens): Token-based authentication mechanism.
* Multer: Middleware for handling file uploads.
* Cloudinary: Cloud-based image and video management service for storing team logos.
* bcrypt: Library for hashing passwords securely.

### Installation
1. Clone the repository
  ```bash
git clone <repository-url>
```
2. Install dependencies
```
cd mock-premier-league
npm install
```
3. Set up environment variables:
Create a `.env` file in the root directory and define the following variables:
```plaintext
PORT=3000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
```
4. Run the Server

### Usage
* Register a new user using the /signup` endpoint.
* Log in with your credentials using the `/login` endpoint to obtain an access token.
* Use the provided access token to access protected routes for managing teams and fixtures.
* Explore the API endpoints listed in the `API Endpoints` section below for detailed usage instructions.

### API Endpoints
The API provides the following endpoints:
* POST `/signup`: Register a new user.
* POST `/login`: Log in with existing user credentials.
> Team Endpoints:
* POST `/team/add`: Create a new team.
* PUT `/team/addPlayers/:id`: Add players to a team.
* PUT `/team/updateTeam/:id`: Update team details.
* DELETE `/team/delete`: Delete a team.
* DELETE `/team/deletePlayer/:id`: Delete a player from a team.
> Fixture Endpoints:
* POST `/fixture/add`: Add a new fixture.
* PUT `/fixture/completed/:link`: Mark a fixture as completed.
* PUT `/fixture/edit/:link`: Edit fixture results.
* GET `/fixture/find/:link`: Find a fixture by link.
* GET `/fixture/findAll`: Get all fixtures.
* GET `/fixture/findByTeamName`: Search fixtures by team name.
* GET `/fixture/findByDateRange`: Search fixtures by date range.
* GET `/fixture/searchByStatus`: Search fixtures by status.
* GET `/fixture/searchByLocation`: Search fixtures by location.
* GET `/fixture/viewCompleted`: View completed fixtures.
* GET `/fixture/viewPending:` View pending fixtures.
* DELETE `/fixture/delete/:link`: Delete a fixture.

  For detailed usage instructions and request/response examples, refer to the API documentation](https://github.com/FredAbod/Mock-Premier-League/).

### Authentication
The API uses JWT (JSON Web Tokens) for authentication. To access protected routes, clients must include a valid JWT token in the `Authorization` header of the HTTP request.
Example:
```plaintext
Authorization: Bearer <access-token>
```




