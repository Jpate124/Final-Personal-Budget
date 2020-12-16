 // Budget API

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = process.env.port || 3000;

const bodyParser = require('body-parser');
const path = require('path');

app.use(cors());
app.use(bodyParser.json());

var connection = mysql.createConnection({
    host     : 'sql9.freemysqlhosting.net',
    user     : 'sql9381593',
    password : 'PU4nkd7EGd',
    database : 'sql9381593'
})

// app.get('/',async (req, res) => {
//     connection.connect();
//     connection.query('SELECT * FROM user', function (error, results, fields) {
//         connection.end();
//         if (error) throw error;
//         res.json(results);
//     });
        
// });

app.get('/',async (req, res) => {
    connection.connect();
    connection.query('INSERT `Final Budget`', function (error, results, fields) {
        connection.end();
        if (error) throw error;
        res.json(results);
    });
        
});

app.get('/',async (req, res) => {
    connection.connect();
    connection.query('SELECT * FROM `Final Budget`', function (error, results, fields) {
        connection.end();
        if (error) throw error;
        res.json(results);
    });
        
});


// Trying to read from the budget-data.json file
const budget = require ("./budget");
const users = require ("./signup");

app.get('/budget', (req, res) => {
    res.json(budget);
});

app.post('/api/signup', (req, res) => {
    const {name, username, password} = req.body;
    console.log('This is me', name, username);
    connection.connect();
    try {
        connection.query('INSERT INTO user (name, username, password) VALUES (?, ?, ?)', [name, username, password], function (error, results, fields) {
            connection.end();
            if (error) throw error;
            res.json(results);
        });    
    } catch (e) {
        console.log(e);
    }
    res.status(200).json({
        status: 'succes',
        data: req.body,
      })
});

app.post('/api/login', (req, res) => {
    const {username, password} = req.body;
    console.log('This is me', username, password);
    connection.connect();
    connection.query('SELECT * FROM `user` ', function (error, results, fields) {
        connection.end();
        if (error) throw error;
        res.json(results);
    });
});



app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'login.component.html'))
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`)
});



  