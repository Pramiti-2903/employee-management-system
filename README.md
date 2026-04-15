# Employee Management System

##  Project Overview

The Employee Management System is a beginner-friendly ASP.NET Core Web API project that allows users to manage employee records efficiently.

It supports basic CRUD operations such as creating, reading, updating, and deleting employee details. The project also includes a simple frontend interface built using HTML, CSS, and JavaScript for easy interaction with the API.

---

##  Tech Stack

* Backend: ASP.NET Core Web API
* Language: C#
* Frontend: HTML, CSS, JavaScript
* API Testing: Swagger

---

##  Features

*  Add new employees
*  View all employees
*  Update employee details
*  Delete employees
*  Simple frontend UI for interaction
*  Swagger UI for API testing and documentation

---

##  Project Structure

```
Employeeemanagement/
│
├── Controllers/        # Contains API controllers
├── Models/             # Contains data models
├── wwwroot/            # Frontend files (HTML, CSS, JS)
├── Program.cs          # Application entry point and configuration
├── appsettings.json    # Application configuration
├── Employeeemanagement.csproj
└── README.md
```

---

##  How to Run the Project

### 1. Clone the Repository

```
git clone https://github.com/Pramiti-2903/employee-management-system.git
```

### 2. Open in Visual Studio

* Open the project folder
* Load the solution

### 3. Run the Application

* Click Run (▶️) or press `F5`

### 4. Access Swagger UI


http://localhost:5157/swagger

http://localhost:5157/index.html

---

##  API Endpoints

| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| GET    | /api/employees      | Get all employees  |
| POST   | /api/employees      | Add a new employee |
| PUT    | /api/employees/{id} | Update an employee |
| DELETE | /api/employees/{id} | Delete an employee |

---

##  Sample Employee JSON

```
{
  "id": 1,
  "name": "John",
  "role": "Developer",
  "salary": 50000
}
```

---

##  Note

* This project uses in-memory data storage (no database).

---

##  Future Improvements

* Add database integration (SQL Server / PostgreSQL)
* Implement authentication (JWT)
* Add input validation and error handling
* Improve UI design

---

##  Author

S.PRAMITI
GitHub: https://github.com/Pramiti-2903
