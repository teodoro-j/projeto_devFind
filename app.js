const express = require('express');
const app = express();
const db = require('./db/connection');

const PORT = 3000;

app.listen(PORT, function() {
    console.log(`O Express esta rodando na porta ${PORT}`);
});

db
  .authenticate()
  .then(() => {
      console.log("Conectou ao banco com sucesso");
  })
  .catch(err => {
      console.log("Ocorreu um erro ao se conectar", err);
  });

app.get('/', (req,res) => {
    res.send("Está funcionando");
});