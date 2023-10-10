# Aglecha Diamonds BackendAglecha Diamonds Backend
## Overview
- Provide a brief overview of the backend part of the Aglecha Diamonds project. Mention the purpose, functionality, and significance of the backend in the project.

## Technologies Used
- List all the technologies, frameworks, and tools used in the backend development, similar to what you mentioned earlier. Include versions if necessary.

## Project Structure
- Explain the structure of your backend project. You can use a tree-like diagram or a brief textual description. Mention the main directories, their purposes, and what each contains.

plaintext
Copy code
```javascript
/backend
│
├── src
│   ├── controllers        # Controllers for handling different routes
│   ├── models             # MongoDB data models
│   ├── routes             # Express.js routes
│   ├── config.js          # Configuration settings
│   └── server.js          # Entry point of the server
│
├── .env.example           # Example environment variables
└── package.json           # Node.js project dependencies and scripts
```
## Installation
- Provide step-by-step instructions on how to set up and run the backend on a local machine.

#### 1. Clone the Repository



> *`git clone <repository-url>`*
*`cd backend`*

#### 2. Install Dependencies

> *`npm install`*

#### 3. Set Environment Variables
- Create a `.env` file based on `.env.example` and set the required environment variables.

#### 4. Run the Server

> *`npm start`*

## API Endpoints
List and describe the main API endpoints with their functionalities and required input/output.

- #### Register
[https://aglecha-backend.onrender.com/register](https://aglecha-backend.onrender.com/register)

- #### Login
[https://aglecha-backend.onrender.com/login](https://aglecha-backend.onrender.com/login)

- #### Users
[https://aglecha-backend.onrender.com/users](https://aglecha-backend.onrender.com/users)

- #### Product
[https://aglecha-backend.onrender.com/product](https://aglecha-backend.onrender.com/product)

- #### Payment
[https://aglecha-backend.onrender.com/api/payment](https://aglecha-backend.onrender.com/api/payment)

- #### Google Oauth Success
[https://aglecha-backend.onrender.com/auth/google/callback](https://aglecha-backend.onrender.com/auth/google/callback)

- #### Google Oauth Failure
[https://aglecha-backend.onrender.com/auth/google/failure](https://aglecha-backend.onrender.com/auth/google/failure)

## Environment Variables

Explain the required environment variables and how to set them.

> **MONGODB_URI:** MongoDB connection URIMONGODB_URI: MongoDB connection URI
> **SECRET_KEY:** Secret key for JWT authentication
...


## Deployment

- Provide detailed steps on how to deploy the backend to a server using Render.com. Include information on setting up the GitHub login and configuring the build command.

#### 1. Deploy to Render.com

- Sign in to your Render account and create a new service.
- Select the repository where your backend code is hosted.
- Configure the service, ensuring the build command is set to **`yarn`** and the start command is set to **`npm start`**.
- Add necessary environment variables in the Render dashboard.

#### 2. GitHub Login Integration

- Ensure you've set up OAuth application on GitHub.
- Configure GitHub OAuth settings in your backend, including callback URLs.

#### 3. Testing

- Verify the deployment by accessing the provided URL and testing the GitHub login functionality.
