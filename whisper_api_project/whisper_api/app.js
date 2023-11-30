const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, Whisper API!');
});

app.listen(port, () => {
  console.log(`Whisper API listening at http://localhost:${port}`);
});