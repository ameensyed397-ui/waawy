# Waayy HRMS - API Documentation

## Overview

Complete REST API documentation for Waayy HRMS. All endpoints require authentication via Clerk unless otherwise specified.

**Base URL:** `http://localhost:3000/api` (development)

---

## Authentication

All API routes use Clerk server-side authentication. Include the Clerk session token in requests.

**Headers:**
```
Authorization: Bearer <clerk_session_token>
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid authentication
- `403 Forbidden` - Insufficient permissions

---

## Company APIs

### Create Company

Creates a new company and automatically creates a founder employee record.

**Endpoint:** `POST /api/companies`

**Request Body:**
```json
{
  "name": "Acme Inc",
  "workModel": "REMOTE",
  "industry": "Technology",
  "size": "11-50"
}
```

**Validation:**
- `name` (required): string, min 1 char
- `workModel` (required): "REMOTE" | "HYBRID" | "OFFICE"
- `industry` (optional): string
- `size` (optional): string

**Response:** `201 Created`
```json
{
  "success": true,
  "company": {
    "id": "cm1a2b3c4d5e6f7g8h9i0j",
    "name": "Acme Inc",
    "workModel": "REMOTE",
    "industry": "Technology",
    "size": "11-50",
    "createdAt": "2024-02-08T10:00:00.000Z"
  },
  "employee": {
    "id": "em1a2b3c4d5e6f7g8h9i0j",
    "role": "FOUNDER",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

**Errors:**
- `400` - Validation error
- `409` - User already has a company

---

### Get User's Company

Retrieves the company for the authenticated user.

**Endpoint:** `GET /api/companies`

**Response:** `200 OK`
```json
{
  "success": true,
  "company": {
    "id": "cm1a2b3c4d5e6f7g8h9i0j",
    "name": "Acme Inc",
    "workModel": "REMOTE",
    "industry": "Technology",
    "size": "11-50",
    "employees": [
      {
        "id": "em1...",
        "firstName": "John",
        "lastName": "Doe",
        "role": "FOUNDER"
      }
    ]
  }
}
```

**Errors:**
- `404` - No company found for user

---

### Get Company Details

Retrieves detailed company information including all employees.

**Endpoint:** `GET /api/companies/:id`

**Parameters:**
- `id` (path): Company ID

**Response:** `200 OK`
```json
{
  "success": true,
  "company": {
    "id": "cm1a2b3c4d5e6f7g8h9i0j",
    "name": "Acme Inc",
    "workModel": "REMOTE",
    "employees": [...]
  }
}
```

**Errors:**
- `403` - User not in this company
- `404` - Company not found

---

### Update Company

Updates company information. Requires FOUNDER or ADMIN role.

**Endpoint:** `PATCH /api/companies/:id`

**Request Body:**
```json
{
  "name": "Acme Corporation",
  "workModel": "HYBRID",
  "industry": "SaaS"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "company": {
    "id": "cm1a2b3c4d5e6f7g8h9i0j",
    "name": "Acme Corporation",
    "workModel": "HYBRID"
  }
}
```

**Errors:**
- `403` - Insufficient permissions (not admin/founder)

---

## Employee APIs

### List Employees

Lists all employees in the user's company.

**Endpoint:** `GET /api/employees`

**Response:** `200 OK`
```json
{
  "success": true,
  "employees": [
    {
      "id": "em1...",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@acme.com",
      "role": "FOUNDER",
      "department": "Engineering",
      "onboardingStatus": "COMPLETED",
      "createdAt": "2024-02-08T10:00:00.000Z"
    }
  ]
}
```

---

### Get Employee Details

Retrieves detailed employee information including tasks and compliance documents.

**Endpoint:** `GET /api/employees/:id`

**Response:** `200 OK`
```json
{
  "success": true,
  "employee": {
    "id": "em1...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@acme.com",
    "role": "FOUNDER",
    "company": {...},
    "onboardingTasks": [...],
    "complianceDocs": [...]
  }
}
```

**Errors:**
- `403` - User not in same company
- `404` - Employee not found

---

### Update Employee

Updates employee information. Users can update themselves, or admins can update any employee.

**Endpoint:** `PATCH /api/employees/:id`

**Request Body:**
```json
{
  "firstName": "Jane",
  "department": "Marketing",
  "onboardingStatus": "COMPLETED"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "employee": {
    "id": "em1...",
    "firstName": "Jane",
    "department": "Marketing"
  }
}
```

**Errors:**
- `403` - Cannot update other employees (unless admin)

---

## Invite APIs

### Create Invites

Creates employee invitations. Requires FOUNDER or ADMIN role.

**Endpoint:** `POST /api/invites`

**Request Body:**
```json
{
  "companyId": "cm1a2b3c4d5e6f7g8h9i0j",
  "invites": [
    {
      "email": "jane@example.com",
      "role": "EMPLOYEE"
    },
    {
      "email": "bob@example.com",
      "role": "MANAGER"
    }
  ]
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "invites": [
    {
      "id": "inv1...",
      "email": "jane@example.com",
      "token": "a1b2c3d4...",
      "expiresAt": "2024-02-15T10:00:00.000Z"
    }
  ],
  "inviteLinks": [
    {
      "email": "jane@example.com",
      "link": "http://localhost:3000/invite/a1b2c3d4..."
    }
  ]
}
```

**Errors:**
- `403` - Insufficient permissions

---

### List Invites

Lists all invites for the user's company.

**Endpoint:** `GET /api/invites`

**Response:** `200 OK`
```json
{
  "success": true,
  "invites": [
    {
      "id": "inv1...",
      "email": "jane@example.com",
      "role": "EMPLOYEE",
      "token": "a1b2c3d4...",
      "expiresAt": "2024-02-15T10:00:00.000Z",
      "acceptedAt": null
    }
  ]
}
```

---

### Validate Invite

Validates an invite token and returns company information.

**Endpoint:** `GET /api/invites/:token`

**Response:** `200 OK`
```json
{
  "success": true,
  "invite": {
    "id": "inv1...",
    "email": "jane@example.com",
    "role": "EMPLOYEE",
    "company": {
      "id": "cm1...",
      "name": "Acme Inc",
      "workModel": "REMOTE"
    }
  }
}
```

**Errors:**
- `404` - Invite not found
- `409` - Invite already accepted
- `410` - Invite expired

---

### Accept Invite

Accepts an invitation and creates an employee record.

**Endpoint:** `POST /api/invites/:token`

**Request Body:**
```json
{
  "clerkUserId": "user_abc123",
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "employee": {
    "id": "em2...",
    "firstName": "Jane",
    "lastName": "Smith",
    "role": "EMPLOYEE",
    "companyId": "cm1..."
  }
}
```

**Errors:**
- `404` - Invite not found
- `409` - Invite already accepted
- `410` - Invite expired

---

## Onboarding APIs

### Create Task

Creates an onboarding task for an employee. Requires FOUNDER or ADMIN role.

**Endpoint:** `POST /api/onboarding/tasks`

**Request Body:**
```json
{
  "employeeId": "em1...",
  "phase": "PRE_ONBOARDING",
  "title": "Complete Right to Work verification",
  "description": "Upload proof of right to work in the UK",
  "dueDate": "2024-02-15T00:00:00.000Z"
}
```

**Validation:**
- `employeeId` (required): string
- `phase` (required): "PRE_ONBOARDING" | "DURING_ONBOARDING" | "POST_ONBOARDING"
- `title` (required): string
- `description` (optional): string
- `dueDate` (optional): ISO date string

**Response:** `201 Created`
```json
{
  "success": true,
  "task": {
    "id": "task1...",
    "employeeId": "em1...",
    "phase": "PRE_ONBOARDING",
    "title": "Complete Right to Work verification",
    "status": "PENDING",
    "createdAt": "2024-02-08T10:00:00.000Z"
  }
}
```

**Errors:**
- `403` - Insufficient permissions
- `404` - Employee not found

---

### List Tasks

Lists onboarding tasks. Can filter by employee.

**Endpoint:** `GET /api/onboarding/tasks?employeeId=em1...`

**Query Parameters:**
- `employeeId` (optional): Filter by employee

**Response:** `200 OK`
```json
{
  "success": true,
  "tasks": [
    {
      "id": "task1...",
      "phase": "PRE_ONBOARDING",
      "title": "Complete Right to Work verification",
      "status": "PENDING",
      "employee": {
        "id": "em1...",
        "firstName": "Jane",
        "lastName": "Smith"
      }
    }
  ]
}
```

---

### Update Task

Updates task status. All employees can update their own tasks.

**Endpoint:** `PATCH /api/onboarding/tasks/:id`

**Request Body:**
```json
{
  "status": "COMPLETED",
  "completedAt": "2024-02-08T15:00:00.000Z"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "task": {
    "id": "task1...",
    "status": "COMPLETED",
    "completedAt": "2024-02-08T15:00:00.000Z"
  }
}
```

---

## Compliance APIs

### Submit Document

Submits a compliance document.

**Endpoint:** `POST /api/compliance/documents`

**Request Body:**
```json
{
  "employeeId": "em1...",
  "type": "RIGHT_TO_WORK",
  "documentUrl": "https://storage.example.com/doc123.pdf",
  "expiryDate": "2026-02-08T00:00:00.000Z"
}
```

**Validation:**
- `employeeId` (required): string
- `type` (required): "RIGHT_TO_WORK" | "HMRC_STARTER" | "GDPR_CONSENT"
- `documentUrl` (optional): string
- `expiryDate` (optional): ISO date string

**Response:** `201 Created`
```json
{
  "success": true,
  "document": {
    "id": "doc1...",
    "employeeId": "em1...",
    "type": "RIGHT_TO_WORK",
    "status": "SUBMITTED",
    "createdAt": "2024-02-08T10:00:00.000Z"
  }
}
```

---

### List Documents

Lists compliance documents. Can filter by employee or type.

**Endpoint:** `GET /api/compliance/documents?employeeId=em1...&type=RIGHT_TO_WORK`

**Query Parameters:**
- `employeeId` (optional): Filter by employee
- `type` (optional): Filter by document type

**Response:** `200 OK`
```json
{
  "success": true,
  "documents": [
    {
      "id": "doc1...",
      "type": "RIGHT_TO_WORK",
      "status": "SUBMITTED",
      "employee": {
        "id": "em1...",
        "firstName": "Jane",
        "lastName": "Smith"
      },
      "createdAt": "2024-02-08T10:00:00.000Z"
    }
  ]
}
```

---

### Verify Document

Verifies or rejects a compliance document. Requires FOUNDER or ADMIN role.

**Endpoint:** `PATCH /api/compliance/documents/:id`

**Request Body:**
```json
{
  "status": "VERIFIED"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "document": {
    "id": "doc1...",
    "status": "VERIFIED",
    "verifiedAt": "2024-02-08T15:00:00.000Z",
    "verifiedBy": "user_abc123"
  }
}
```

**Errors:**
- `403` - Only admins can verify documents

---

## Error Responses

All endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "details": {...}  // Optional validation details
}
```

### Status Codes
- `200 OK` - Success
- `201 Created` - Resource created
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource conflict (e.g., already exists)
- `410 Gone` - Resource expired
- `500 Internal Server Error` - Server error

---

## Rate Limiting

Currently no rate limiting implemented. Consider adding in production:
- 100 requests per minute per user
- 1000 requests per hour per company

---

## Pagination

Not currently implemented. For large datasets, consider adding:

```
GET /api/employees?page=1&limit=20
```

Response:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

---

## Testing with cURL

### Create Company
```bash
curl -X POST http://localhost:3000/api/companies \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "Test Company",
    "workModel": "REMOTE"
  }'
```

### List Employees
```bash
curl http://localhost:3000/api/employees \
  -H "Authorization: Bearer <token>"
```

### Create Invite
```bash
curl -X POST http://localhost:3000/api/invites \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "companyId": "cm1...",
    "invites": [{"email": "test@example.com", "role": "EMPLOYEE"}]
  }'
```

---

## Summary

The Waayy HRMS API provides:
- ✅ Complete CRUD operations for all entities
- ✅ Role-based access control
- ✅ Consistent error handling
- ✅ Input validation with Zod
- ✅ Company-scoped data access
- ✅ RESTful design principles
