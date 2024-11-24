const express = require('express');
const router = express.Router();
const db = require('../db'); 

// Get All Permissions
// http://localhost:4000/permissions
router.get('/', (req, res) => {
    const query = `SELECT * FROM permissions`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Get Permission by ID
// http://localhost:4000/permissions/:id
router.get('/:id', (req, res) => {
    const query = `SELECT * FROM permissions WHERE id = ?`;
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Permission not found' });
        }
        res.json(results[0]);
    });
});

// Add a New Permission
// http://localhost:4000/permissions/add-permission
router.post('/add-permission', (req, res) => {
    const { name, description } = req.body;
    const query = `INSERT INTO permissions (name, description) VALUES (?, ?)`;
    db.query(query, [name, description], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Permission added successfully', id: result.insertId });
    });
});

// Update Permission
// http://localhost:4000/permissions/update-permission/:id
router.put('/update-permission/:id', (req, res) => {
    const { name, description } = req.body;
    const query = `UPDATE permissions SET name = ?, description = ? WHERE id = ?`;
    db.query(query, [name, description, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Permission not found' });
        }
        res.json({ message: 'Permission updated successfully' });
    });
});

// Delete Permission
http://localhost:4000/permissions/:id
router.delete('/:id', (req, res) => {
    const query = `DELETE FROM permissions WHERE id = ?`;
    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Permission not found' });
        }
        res.json({ message: 'Permission deleted successfully' });
    });
});

module.exports = router;
