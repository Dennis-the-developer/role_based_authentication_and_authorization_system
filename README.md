Ideation Axis Intenship

Assignment 2 - Build a Role-Based Authentication and Authorization System

Note: An endpoint for creating admins has been implemented. This is to allow users of this api to be able to
perform certain admin roles such as creating users, assigning roles, deleting users, etc.

Create a backend API that implements both and using JWT for authentication and role-based access control (RBAC) for authorization. Below are the task requirements.

1. User Authentication:
Implement user registration and login endpoints.
Use JWT for token-based authentication.
Upon successful login, return an access token to the user.

2. Role-Based Authorization:
Implement : Admin, User, Guest.
Create an endpoint to to users (e.g., only admins can assign roles).
Protect endpoints based on roles:
Admin: Can create, update, and delete user data.
User: Can read and update their own profile.
Guest: Can only view public data.

3. API Endpoints To Implement:
POST /auth/register: Register a new user.
POST /auth/login: Authenticate a user and return a JWT.
POST /auth/assign-role: Assign a role to a user (admin-only).
GET /profile: Retrieve the authenticated user’s profile (accessible to authenticated users).
PUT /profile: Update the authenticated user’s profile (authenticated users only).
DELETE /user/:id: Delete a user by ID (admin-only).
GET /public-data: Retrieve data accessible to all users, including guests.

4. Token Validation and Expiry:
Implement token validation: Users must send their token in the (e.g., Bearer <token>).
Set token expiry  (e.g., 1 hour) and handle .

5. Security:
Protect all endpoints using JWT.
Use HTTPS to ensure secure communication.
Add password hashing for storing passwords securely (e.g., using bcrypt or argon2).

6. Advanced Task:
Implement OAuth2 login via a third-party provider (e.g., Google).
Add a multi-factor authentication (MFA) using an OTP system.
Add logging and rate limiting to prevent brute-force attacks.

Technologies to use
Backend Stack: Django (Python), Node.js (Express), or .NET Core (C#); [ your preferred tech stack ]
Database: PostgreSQL or MySQL.
Authentication : JWT (e.g., django-rest-framework-jwt, jsonwebtoken in Node.js, or System.IdentityModel.Tokens.Jwt in .NET).
Authorization: Role-based permissions (RBAC).

Evaluation Criteria:
Correct implementation of JWT authentication.
Proper role-based authorization for each endpoint.
Security best practices (e.g., password hashing, secure token storage).
Clean and well-structured code (organized routes, error handling).
Ability to extend the system (e.g., adding more roles or OAuth integration).

Submissions:
Your API base URL for testing.
Your API documentation URL [Use Swagger or Mackdown]
Your Github repo containing task implementation
