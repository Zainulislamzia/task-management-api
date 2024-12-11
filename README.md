# Task Management API

## Overview

A RESTful API for task management with user authentication and task management using Express.js and MongoDB.

## Prerequisites

- Node.js (latest version)
- MongoDB

## Setup Instructions

1. Clone the repository
2. Install dependencies

```bash
npm install
```

3. Create a `.env` file with the following:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=2m
PORT=5000
```

4. Run the application

```bash
# Development mode
npm run dev
```

5. Run the application in test mode

```bash
# Test mode
# Run this command to run unit tests
npm test
```

## Instructions to test the application

1. You can use postman or thunder client to send requests to the server.
2. Example url: http://localhost:5000/api/v1/login

## Example Requests and Responses

### User Login

- **Request**: `POST /api/v1/login`
  ```json
  {
    "email": "user@example.com",
    "password": "userpassword"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt_token_here",
    "data": {
      "_id": "user_id",
      "email": "user@example.com",
      "name": "User Name"
    }
  }
  ```

### Get All Tasks

- **Request**: `GET /api/v1/tasks`
- **Response**:
  ```json
  [
    {
      "_id": "task_id",
      "title": "Task Title",
      "description": "Task Description",
      "completed": false,
      "createdAt": "2024-12-10T10:48:43+05:00"
    }
  ]
  ```

### Create a Task

- **Request**: `POST /api/v1/tasks`
  ```json
  {
    "title": "New Task",
    "description": "Task Description"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "new_task_id",
    "title": "New Task",
    "description": "Task Description",
    "completed": false,
    "createdAt": "2024-12-10T10:48:43+05:00"
  }
  ```

### Get a Task by ID

- **Request**: `GET /api/v1/tasks/:id`
- **Response**:
  ```json
  {
    "_id": "task_id",
    "title": "Task Title",
    "description": "Task Description",
    "completed": false,
    "createdAt": "2024-12-10T10:48:43+05:00"
  }
  ```

### Update a Task

- **Request**: `PUT /api/v1/tasks/:id`
  ```json
  {
    "title": "Updated Task",
    "description": "Updated Description"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "task_id",
    "title": "Updated Task",
    "description": "Updated Description",
    "completed": false,
    "createdAt": "2024-12-10T10:48:43+05:00"
  }
  ```

### Patch a Task

- **Request**: `PATCH /api/v1/tasks/:id`
  ```json
  {
    "completed": true
  }
  ```
- **Response**:
  ```json
  {
    "_id": "task_id",
    "title": "Task Title",
    "description": "Task Description",
    "completed": true,
    "createdAt": "2024-12-10T10:48:43+05:00"
  }
  ```

### Delete a Task

- **Request**: `DELETE /api/v1/tasks/:id`
- **Response**:
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```
