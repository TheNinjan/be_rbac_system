const express = require('express');
const router = express.Router();
const db = require('../db'); // Import your MySQL connection

// Get All Users
// http://localhost:4000/users
router.get('/', (req, res) => {
    const query = `
        SELECT users.*, roles.name AS role_name 
        FROM users 
        LEFT JOIN roles ON users.role_id = roles.id
    `;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Get User by ID
// http://localhost:4000/users/:id
router.get('/:id', (req, res) => {
    const query = `
        SELECT users.*, roles.name AS role_name 
        FROM users 
        LEFT JOIN roles ON users.role_id = roles.id 
        WHERE users.id = ?
    `;
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(results[0]);
    });
});

// Route to get detailed user, role, and permissions data
// http://localhost:4000/users/details/id
router.get('/details/:id', (req, res) => {
    const query = `SELECT 
    users.id AS user_id, 
    users.name AS user_name, 
    users.email, 
    users.status, 
    roles.id AS role_id,
    roles.name AS role_name,
    roles.permissions AS role_permissions,
    GROUP_CONCAT(permissions.name) AS permissions
FROM 
    users
LEFT JOIN roles ON users.role_id = roles.id
LEFT JOIN permissions 
    ON FIND_IN_SET(permissions.id, roles.permissions) > 0
WHERE 
    users.id = ?
GROUP BY 
    users.id, roles.id;
`;
db.query(query, [req.params.id], (err, results) => {
    if (err) {
        return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
    }

    const result = results[0];
    if (typeof result.role_permissions === 'string') {
        try {
            result.role_permissions = JSON.parse(result.role_permissions);
        } catch (error) {
            console.error('Error parsing role_permissions JSON:', error);
            result.role_permissions = [];
        }
    }

    res.json(result);
});

});




// Add a New User
// http://localhost:4000/users/add-user
router.post('/add-user', (req, res) => {
    const { name, email, role_id, status } = req.body;
    const query = `INSERT INTO users (name, email, role_id, status) VALUES (?, ?, ?, ?)`;
    db.query(query, [name, email, role_id, status], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'User added successfully', id: result.insertId });
    });
});

// Update User
// http://localhost:4000/users/update-user/:id
router.put('/update-user/:id', (req, res) => {
    const { name, email, role_id, status } = req.body;
    const query = `UPDATE users SET name = ?, email = ?, role_id = ?, status = ? WHERE id = ?`;
    db.query(query, [name, email, role_id, status, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User updated successfully' });
    });
});
// Activate User
// http://localhost:4000/users/activate-user/:id
router.put('/activate-user/:id', (req, res) => {
    const query = `UPDATE users SET status = 'Active' WHERE id = ?`;
    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User activated successfully' });
    });
});
 
// deactivate User
// http://localhost:4000/users/deactivate-user/:id
router.put('/deactivate-user/:id', (req, res) => {
    const query = `UPDATE users SET status = 'Inactive' WHERE id = ?`;
    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deactivated successfully' });
    });
});

// Delete User
// http://localhost:4000/users/:id
router.delete('/:id', (req, res) => {
    const query = `DELETE FROM users WHERE id = ?`;
    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    });
});

module.exports = router;
