const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

const uploadRoute = require('./routes/upload');
const deleteRoute = require('./routes/delete');

app.use('/', uploadRoute);
app.use('/', deleteRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});