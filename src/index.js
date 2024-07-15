const express = require('express')
const app = express()
const port = 3000

const config = {
  host: 'db',
  user: 'node',
  password: 'db',
  database: 'nodedb'
}

const mysql = require('mysql');
const connection = mysql.createConnection(config);

  const create = `
    CREATE TABLE IF NOT EXISTS people (
      id INT AUTO_INCREMENT,
      name VARCHAR(255),
      PRIMARY KEY(id)
    )
  `;

connection.query(create, function(err, results, fields) {
  if (err) {
    console.error('Erro ao criar tabela', err);
  } else {

    const insertQuery = `INSERT INTO people(name) VALUES('vitor')`;

    connection.query(insertQuery);

    connection.end(); 
  }
});

app.get('/', (req, res) => { 
 
  const connection = mysql.createConnection(config);
  
  const query = 'select * from people';

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Erro ao buscar dados', error);
      res.status(500).send('Erro ao buscar dados');
       return;
    }
    
    let responseHtml = '<h1>Full Cycle Rocks!</h1><ul>';
    results.forEach((element) => {
      responseHtml += `<li>${element.id}-${element.name}</li>`;
    });
    responseHtml += '</ul>';

    res.send(responseHtml);
    connection.end();

  });
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
})