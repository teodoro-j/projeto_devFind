const express = require('express');
const exphbs = require('express-handlebars'); // dando erro
const app = express();
const path = require('path');
const db = require('./db/connection');
const bodyParser = require('body-parser');
const Job = require('./models/Job');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const PORT = 3000;

app.listen(PORT, function() {
    console.log(`O Express esta rodando na porta ${PORT}`);
});

app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

db
  .authenticate()
  .then(() => {
      console.log("Conectou ao banco com sucesso");
  })
  .catch(err => {
      console.log("Ocorreu um erro ao se conectar", err);
  });

app.get('/', (req, res) => {

    let search = req.query.job;
    let query = '%'+search+'%';

    if(!search){
        Job.findAll({order: [
            ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            res.render('index', {
                jobs
            });
        })
        .catch(err => console.log(err));
    } else {
        Job.findAll({
            where: {company: {[Op.like]: query}}, 
            order: [
            ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            res.render('index', {
                jobs, search
            });
        });
    }
    
});



app.use('/jobs', require('./routes/jobs'));