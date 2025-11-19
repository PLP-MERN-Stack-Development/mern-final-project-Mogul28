# XTracker API Documentation

## Base URL

- **Development**: `http://localhost:3000`
- **Production**: `https://your-backend-url.onrender.com`

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-token>
```

Tokens are obtained through the `/api/auth/signup` or `/api/auth/login` endpoints and are valid for 30 days.

---

## Endpoints

### Health Check

#### GET `/health`

Check if the API is running and database is connected.

**Response:**
```json
{
  "status": "ok",
  "message": "Expense Tracker API is running",
  "database": "connected"
}
```

---

### Authentication

#### POST `/api/auth/signup`

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token_here"
}
```

**Error Responses:**
- `400 Bad Request` - Missing fields or validation error
- `400 Bad Request` - User already exists
- `500 Internal Server Error` - Server error

---

#### POST `/api/auth/login`

Authenticate an existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token_here"
}
```

**Error Responses:**
- `400 Bad Request` - Missing email or password
- `401 Unauthorized` - Invalid credentials
- `500 Internal Server Error` - Server error

---

### Expenses

All expense endpoints require authentication.

#### GET `/api/expenses`

Get all expenses for the authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
[
  {
    "id": "expense_id",
    "category": "Food & Dining",
    "description": "Lunch at restaurant",
    "date": "2024-01-15",
    "vendor": "Restaurant Name",
    "amount": 25.50,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token
- `500 Internal Server Error` - Server error

---

#### GET `/api/expenses/:id`

Get a specific expense by ID (must belong to authenticated user).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "id": "expense_id",
  "category": "Food & Dining",
  "description": "Lunch at restaurant",
  "date": "2024-01-15",
  "vendor": "Restaurant Name",
  "amount": 25.50,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token
- `404 Not Found` - Expense not found or doesn't belong to user
- `500 Internal Server Error` - Server error

---

#### POST `/api/expenses`

Create a new expense.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "category": "Food & Dining",
  "description": "Lunch at restaurant",
  "date": "2024-01-15",
  "vendor": "Restaurant Name",
  "amount": 25.50
}
```

**Response (201 Created):**
```json
{
  "id": "expense_id",
  "category": "Food & Dining",
  "description": "Lunch at restaurant",
  "date": "2024-01-15",
  "vendor": "Restaurant Name",
  "amount": 25.50,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request` - Missing required fields
- `401 Unauthorized` - Missing or invalid token
- `500 Internal Server Error` - Server error

---

#### PUT `/api/expenses/:id`

Update an existing expense (must belong to authenticated user).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body (all fields optional):**
```json
{
  "category": "Transportation",
  "description": "Updated description",
  "date": "2024-01-16",
  "vendor": "Updated Vendor",
  "amount": 30.00
}
```

**Response (200 OK):**
```json
{
  "id": "expense_id",
  "category": "Transportation",
  "description": "Updated description",
  "date": "2024-01-16",
  "vendor": "Updated Vendor",
  "amount": 30.00,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-16T11:00:00.000Z"
}
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token
- `404 Not Found` - Expense not found or doesn't belong to user
- `500 Internal Server Error` - Server error

---

#### DELETE `/api/expenses/:id`

Delete an expense (must belong to authenticated user).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (204 No Content)**

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token
- `404 Not Found` - Expense not found or doesn't belong to user
- `500 Internal Server Error` - Server error

---

### Categories

#### GET `/api/categories`

Get list of available expense categories (public endpoint, no authentication required).

**Response (200 OK):**
```json
[
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Utilities",
  "Entertainment",
  "Healthcare",
  "Education",
  "Other"
]
```

---

## Data Models

### User
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "password": "string (hashed, never returned in API)"
}
```

### Expense
```json
{
  "id": "string",
  "user": "string (user ID)",
  "category": "string",
  "description": "string",
  "date": "string (ISO date format: YYYY-MM-DD)",
  "vendor": "string",
  "amount": "number (>= 0)",
  "createdAt": "string (ISO datetime)",
  "updatedAt": "string (ISO datetime)"
}
```

---

## Error Response Format

All error responses follow this format:

```json
{
  "error": "Error message description"
}
```

---

## Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `204 No Content` - Request successful, no content to return
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required or failed
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Rate Limiting

Currently, there are no rate limits implemented. This may change in future versions.

---

## CORS

The API supports CORS for the configured frontend domain. In production, only requests from the configured `FRONTEND_URL` are allowed.

---

## Notes

- All dates should be in `YYYY-MM-DD` format
- Amounts are stored as numbers (floats)
- JWT tokens expire after 30 days
- All timestamps are in UTC
- User passwords are hashed using bcrypt and never returned in API responses

