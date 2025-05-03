const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/files/search/:id', (req, res) => {
    res.json(db.readDb()['files'].find(o => o.id == req.params.id));
});

module.exports = router;