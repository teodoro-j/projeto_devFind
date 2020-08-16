const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const db = require('./db/connection');
const bodyParser = require('body-parser');

const PORT = 3000;

app.listen(PORT, function() {
    console.log(`O Express esta rodando na porta ${PORT}`);
});

app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

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

app.use('/jobs', require('./routes/jobs'));