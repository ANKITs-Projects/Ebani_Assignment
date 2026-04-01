# 🚀 Ebani Assignment – Backend API

This backend application implements a **Role-Based Access Control (RBAC)** system with three roles:

- 👑 Super Admin  
- 🧑‍💼 Admin  
- 👤 User

---
## 🌐 Live URL
https://ebani-assignment-p25e.vercel.app/


- SuperAdmin LoginId Password 
``` 
superadmin1@mail.com
```
```
SuperAdmin@123
```

---

## 📌 Tech Stack

- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- JWT Authentication  
- Bcrypt

## 🏗️ Architecture

This project follows a **Class-Based Layered Architecture** to ensure scalability, maintainability, and separation of concerns.

### 🔁 Request Flow

Route → Controller → Service → Database

---

### 📦 Layers Overview

#### 1️⃣ Controllers
- Handle HTTP requests and responses
- Call appropriate service methods
- Do not contain business logic

**Examples:**
- `LoginController`
- `SuperAdminController`
- `AdminController`
- `UserController`

---

#### 2️⃣ Services
- Contain business logic
- Communicate with database model

**Examples:**
- `LoginService`
- `SuperAdminService`
- `AdminService`
- `UserService`

---


#### 4️⃣ Models
- Define database schema using Mongoose

---

#### 5️⃣ Middlewares
- Handle cross-cutting concerns

**Includes:**
- Authentication (JWT verification via cookies)
- Role-based authorization (RBAC)

---

### 🎯 Benefits of This Architecture

- Clear separation of concerns  
- Easy to maintain and scale  
- Reusable and testable components  
- Cleaner and more structured codebase  

---

## 🔐 Authentication

- Authentication is implemented using **JWT stored in HTTP-only cookies**
- On successful login, a cookie is set: Cookie: token=<jwt>
- The browser automatically sends this cookie with every request
- No need to manually attach Authorization headers

---

## 🗂️ User Schema Design

The application uses a **single User collection** to manage all roles:

- Super Admin
- Admin
- User

### 📄 Fields

| Field | Type | Description |
|------|------|------------|
| name | String | User name |
| email | String | Unique email |
| phone | String | Contact number |
| password | String | Hashed password |
| role | String | Role (SuperAdmin / Admin / User) |
| createdBy | ObjectId | Reference to creator (Admin ID for Users) |

---

### 🔗 Relationship Logic

- **Super Admin**
  - Can create Admins and Users
  ```
  createdBy → null | adminId
  ```

- **Admin**
  - Can create Users
  - Users will store:
    ```
    createdBy = adminId
    ```

- **User**
  - Belongs to an Admin
  - Can only access their own data

---

### 🎯 Example Document

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "hashed_password",
  "role": "User",
  "createdBy": "64f1a2c9..."
}
```

---

## 🌐 Base URL

http://localhost:8000

## 📡 API Endpoints

### 🔐 Auth

| Method | Endpoint | Description |
|--------|---------|------------|
| POST | `/api/login` | Login (All roles) |

---

### 👑 Super Admin

| Method | Endpoint | Description |
|--------|---------|------------|
| POST | `/api/superadmin/signup` | SignUp SuperAdmin |
| POST | `/api/superadmin/createadmin` | Create Admin |
| POST | `/api/superadmin/createuser` | Create User |
| GET | `/api/superadmin/getadmins` | Get Admins Grouped With Its Users|
| PUT | `/api/superadmin/updateadmins/:adminId` | Update Admin |
| PUT | `/api/superadmin/updateuser/:userId` | Update User |
| DELETE | `/api/superadmin/deleteadmin/:adminid` | Delete Admin With Its Users|
| DELETE | `/api/superadmin/deleteuser/:userid` | Delete User |

---

### 🧑‍💼 Admin

| Method | Endpoint | Description |
|--------|---------|------------|
| POST | `/api/admin/createuser` | Create User |
| GET | `/api/admin/getusers` | Get Users |
| PUT | `/api/admin/updateUser/:userId` | Update User |
| DELETE | `/api/admin/deleteuser/:userid` | Delete User |

---

### 👤 User

| Method | Endpoint | Description |
|--------|---------|------------|
| POST | `/api/user/createtask` | Create Task |
| GET | `/api/user/gettask` | Get Tasks |
| PUT | `/api/user/updatetask/:taskid` | Update Task |
| DELETE | `/api/user/delettask/:taskid` | Delete Task |
