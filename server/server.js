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

const budget = require ("./budget");
const users = require ("./signup");

app.post('/budget', (req, res) => {
    const userId = req.body.userId;
    try {
        connection.query('SELECT * FROM Budget Where userId = ?', userId, function (error, results, fields) {
        if (error) throw error;
            console.log(results);
            res.json(results);
        });
     } catch (e) {
        console.log(e);
     }
});

app.post('/add/budget', (req, res) => {
    const {date, title, budget} = req.body[0];
    const userId = req.body[1];
    try {
        connection.query('INSERT INTO Budget (date, title, budget, userId) VALUES (?, ?, ?, ?)', [date, title, budget, userId], function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });    
    } catch (e) {
        console.log(e);
    }
});

app.post('/api/signup', (req, res) => {
    const {name, username, password} = req.body;
    try {
        connection.query('INSERT INTO user (name, username, password) VALUES (?, ?, ?)', [name, username, password], function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });    
    } catch (e) {
        console.log(e);
    }
});

app.post('/api/login', (req, res) => {
    const {username, password} = req.body;
    connection.query('SELECT * FROM `user` Where username = ? and password = ?', [username, password], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`)
});



  