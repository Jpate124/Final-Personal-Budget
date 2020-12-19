 // Budget API

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
//const port = process.env.port || 3000;
const port = 3000;

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');

app.use(cors());
app.use(bodyParser.json());

// var connection = mysql.createConnection({
//     host     : 'sql9.freemysqlhosting.net',
//     user     : 'sql9381593',
//     password : 'PU4nkd7EGd',
//     database : 'sql9381593'
// })


var connection = mysql.createConnection({
    host     : 'sql9.freemysqlhosting.net',
    user     : 'sql9382960',
    password : 'fUAGcUfqS8',
    database : 'sql9382960'
})

const secretKey = 'My super secret key';
const jwtMW = exjwt({
    secret: secretKey,
    algorithms: ['HS256']
});


app.post('/budget', (req, res) => {
    const userId = req.body.userId;
    try {
        connection.query('SELECT * FROM Budget Where userId = ?', userId, function (error, results, fields) {
        if (error) throw error;
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
        if(!(results.length  === 0 || results === undefined)) {
            let token = jwt.sign({ id: results[0].id, username: results[0].username, name: results[0].name }, secretKey, { expiresIn: '7d'});
            res.json({
                success: true, 
                err: null,
                token
            });
        }
    });
});

app.listen(port, () => {
    console.log(`API running at port:${port}`)
});



  