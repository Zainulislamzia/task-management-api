# Task Management API

## Overview

A RESTful API for task management with user authentication using Express.js and MongoDB.

## Prerequisites

- Node.js (v14+)
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
JWT_EXPIRATION=3600
PORT=5000
```

4. Run the application

```bash
# Development mode
npm run dev
```

## Example Requests and Responses

### User Login
- **Request**: `POST /auth/login`
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
- **Request**: `GET /tasks`
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
- **Request**: `POST /tasks`
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
- **Request**: `GET /tasks/:id`
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
- **Request**: `PUT /tasks/:id`
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
- **Request**: `PATCH /tasks/:id`
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
- **Request**: `DELETE /tasks/:id`
- **Response**:
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```
