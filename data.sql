CREATE DATABASE rbac_db;
use rbac_system;
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    permissions JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role_id INT NOT NULL,
    status ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

INSERT INTO permissions (name, description)
VALUES
    ('read_users', 'Can read user details'),
    ('write_users', 'Can add or edit users'),
    ('delete_users', 'Can delete users'),
    ('read_roles', 'Can view roles'),
    ('write_roles', 'Can create or edit roles'),
    ('delete_roles', 'Can delete roles');
    
INSERT INTO roles (name, permissions)
VALUES
    ('Admin', JSON_ARRAY('read_users', 'write_users', 'delete_users', 'read_roles', 'write_roles', 'delete_roles')),
    ('Editor', JSON_ARRAY('read_users', 'write_users', 'read_roles')),
    ('Viewer', JSON_ARRAY('read_users'));
INSERT INTO users (name, email, role_id, status)
VALUES
    ('John Doe', 'john@example.com', 1, 'Active'),
    ('Jane Smith', 'jane@example.com', 2, 'Inactive'),
    ('Bob Johnson', 'bob@example.com', 3, 'Active');



