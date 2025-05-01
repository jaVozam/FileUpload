const express = require('express');
const path = require('path');
const router = express.Router();

const db = require('../db');

const fileUpload = require('express-fileupload');

router.use(fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }
}));

router.get('/upload', (req, res) => {
    res.send(`
    <h2>Upload a File</h2>
    <form action="/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="file" required />
      <button type="submit">Upload</button>
    </form>
  `);
});

router.post('/upload', (req, res) => {
    if (!req.files) return res.json({ error: 'No file uploaded' });

    const uploadedFile = req.files.file;

    data = db.readDb()['files'];

    const copy = data.find(o => o.name === uploadedFile.name);
    if (copy) return res.json({ error: 'File exists' });

    const uploadPath = path.join(__dirname, '../', 'files', uploadedFile.name);

    uploadedFile.mv(uploadPath, err => {
        if (err) return res.json({ error: 'Failed to save file' });

        const files = data;

        db.addData('files', {
            "id": files.length > 0
                ? Math.max(...files.map(u => u.id)) + 1
                : 1, "name": uploadedFile.name, "path": "./files/" + uploadedFile.name
        });

        res.json({
            message: 'Upload successful',
            fileName: uploadedFile.name,
            fileSizeKB: (uploadedFile.size / 1024).toFixed(2)
        });
    });
});

module.exports = router;