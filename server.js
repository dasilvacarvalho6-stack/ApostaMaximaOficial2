const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/jogos', (req, res) => {
  const data = fs.readFileSync('./data/api_jogos.json');
  res.json(JSON.parse(data));
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
