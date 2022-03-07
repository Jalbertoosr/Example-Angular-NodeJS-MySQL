var express = require('express');
var router = express.Router();
var md5 = require('md5');
var jwt = require('jsonwebtoken');
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "msoT%mrry!W52",
    database: "omnicanal"
});


router.post('/register', async function (req, res, next) {

 /*   if(con) {
        console.log('conectado a BD')
    } else {
        console.log('No se pudo conectar a BD');
    } */

    try {
        let { username, email, password } = req.body;
        const hashed_password = md5(password.toString());
        console.log('Hasheo de password: ' + hashed_password);
        const checkUsername = 'Select username FROM users WHERE username = ?';
        con.query(checkUsername, [username], (err, result, fields) => {    
            if (!result.length) {
                //const sql = 'Insert Into users (null,username, email, password) VALUES ( ?, ?, ? )'
                const sql = 'INSERT INTO users VALUES(NULL,?,?,?)'
                con.query(
                    sql, [username, email, hashed_password],
                    (err, result, fields) => {
                        if (err) {
                            res.send({ status: 0, data: err });
                        } else {
                            let token = jwt.sign({ data: result }, 'secret')
                            res.send({ status: 1, data: result, token: token });
                        }
                    })
            }
        });
    } catch (error) {
        res.send({ status: 0, error: error });
    }
});
router.post('/login', async function (req, res, next) {
    try {
        let { username, password } = req.body;
        const hashed_password = md5(password.toString())
        //const sql = `SELECT * FROM users WHERE username = ? AND password = ?`
        const sql = 'SELECT * FROM users WHERE username = ? AND password = ?'
        con.query(
            sql, [username, hashed_password],
            function (err, result, fields) {
                console.log('Resultado: ' + result);
                if (err) {
                    res.send({ status: 0, data: err });
                    console.log('Ups, el usuario no existe');
                } else {
                    let token = jwt.sign({ data: result }, 'secret')
                    res.send({ status: 1, data: result, token: token });
                }
            })
    } catch (error) {
        res.send({ status: 0, error: error });
    }
});
module.exports = router