const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/files/download/:id', (req, res) => {
    data = db.readDb()['files'];
    res.download(data.find(o => o.id == req.params.id).path);
});

module.exports = router;