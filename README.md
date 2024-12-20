# RBAC Project

This project implements a Role-Based Access Control (RBAC) system using ReactJS for the frontend and ExpressJS for the backend. The system allows administrators to manage users, roles, and permissions with an intuitive interface and efficient API integrations.

## Project Overview : The RBAC system provides the following functionalities:

1. **User Management**: 
 i. Add, edit, view, delete, and activate/deactivate users.
ii. Assign roles to users.
iii.Display user information in a responsive and searchable table.

2. **Role Management**:
i.Create roles with specific permissions.
ii.View, edit, or delete existing roles.
iii.Dynamically update roles and their permissions.

3. **Permission Management**:
i.Define permissions for various actions.
ii.View and edit existing permissions.

4.**Responsive Design**:
i.Fully responsive frontend for both desktop and mobile devices.
ii.Designed with Bootstrap for modern UI/UX.

### Repositories :
1. **Frontend** :This repository contains the **frontend** built with Vite
```bash
   https://github.com/TheNinjan/fe_rbac_system
```

```bash
   git clone https://github.com/TheNinjan/fe_rbac_system.git
```

2. **Backend**:This repository contains the **backend** built with Vite
```bash
   https://github.com/TheNinjan/be_rbac_system
```

```bash
   git clone https://github.com/TheNinjan/be_rbac_system.git
```
---

## Prerequisites for setting backend locally:

- **Node.js**: Make sure you have Node.js installed on your system. You can download it from [Node.js official website](https://nodejs.org/).
- **npm or yarn**: Node.js comes with `npm`. Alternatively, you can use `yarn` as a package manager.
- **MySQL**(Optional:If remote access is working): Ensure that MySQL is installed and running on your system. You can download it from the MySQL official website. After installation:

---
## Backend  (ExpressJS)

### Repository
Backend code is located in this repository.

### How To Run  Express Server Locally

1. **Clone this repository**:
   ```bash
   git clone https://github.com/TheNinjan/be_rbac_system.git
   ```
2. **Navigate to the project directory**:
      ```bash
          cd rbac-system-be
      ```

3. **Install dependencies**:
   ```bash 
            npm install
   ```

4. **Start the development server**:
```base  
      npm start
```
5.  **SetUp Database**(Optinal:If remote access is working):Set Up the Database To configure the backend server.
i.Use **data.sql** file to configure the database.
ii.update the database credentials with your own local credentials, in **db.js**.
   


