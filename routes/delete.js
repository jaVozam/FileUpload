const express = require('express');
const fs = require('fs');
const router = express.Router();

const db = require('../db');

router.get('/files/delete/:id', (req, res) => {
    fetch(`http://localhost:3000/files/delete/${req.params.id}`, {
        method: 'DELETE',
    }).then(() => res.json(db.readDb()['files']));
});

router.delete('/files/delete/:id', (req, res) => {
    filePath = db.readDb()['files'].find(o => o.id == req.params.id).path;
    fs.unlink(filePath, (err) => {
        if (err) return console.log(`Error removing file: ${err}`);
        console.log(`File ${filePath} has been successfully removed.`);
    });
    db.deleteData('files', req.params.id);
    res.json(db.readDb()['files']);
});

module.exports = router;