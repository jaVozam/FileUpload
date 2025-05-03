const express = require('express');
const app = express();

const db = require('./db');

app.get('/', (req, res) => {
  res.json(db.readDb());
});

const uploadRoute = require('./routes/upload');
const deleteRoute = require('./routes/delete');
const downloadRoute = require('./routes/download');
const searchRoute = require('./routes/search');

app.use('/', uploadRoute);
app.use('/', deleteRoute);
app.use('/', downloadRoute);
app.use('/', searchRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});