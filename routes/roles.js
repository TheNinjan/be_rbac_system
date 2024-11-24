const express = require('express');
const router = express.Router();
const db = require('../db'); 

// Get All Roles
// http://localhost:4000/roles
router.get('/', (req, res) => {
    const query = `SELECT * FROM roles`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Get Role by ID
// http://localhost:4000/roles/:id
router.get('/:id', (req, res) => {
    const query = `SELECT * FROM roles WHERE id = ?`;
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.json(results[0]);
    });
});

// Add a New Role
// http://localhost:4000/roles/add-role
router.post('/add-role', (req, res) => {
    const { name, permissions } = req.body;
    const query = `INSERT INTO roles (name, permissions) VALUES (?, ?)`;
    db.query(query, [name, JSON.stringify(permissions)], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Role added successfully', id: result.insertId });
    });
});

// Update Role
// http://localhost:4000/roles/update-role/:id
router.put('/update-role/:id', (req, res) => {
    const { name, permissions } = req.body;
    const query = `UPDATE roles SET name = ?, permissions = ? WHERE id = ?`;
    db.query(query, [name, JSON.stringify(permissions), req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.json({ message: 'Role updated successfully' });
    });
});

// Delete Role
// http://localhost:4000/roles/:id
router.delete('/:id', (req, res) => {
    const query = `DELETE FROM roles WHERE id = ?`;
    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.json({ message: 'Role deleted successfully' });
    });
});

module.exports = router;
