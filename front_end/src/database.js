// MYSQL CLOUD SQL CONNECTION -> WORKING
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection (
    {
        host: "localhost",
        user: "root",
        password: "passwordCCTV123",
        database: "cardetectiondb"
        // host: "aws-eu-west-2.connect.psdb.cloud",
        // username: "l94a31kt8gs9f3lk16y1",
        // password: "pscale_pw_FALSUhwMAZ50X8qIDoZQdOXuZHtrSABu9PURVkCTFy7",
        // database: "cardetectiondb",
        // ssl: {"rejectUnauthorized":true}
        // ssl: false
    }
);

db.connect(function(err) {
    if (err){
        throw err;
    }
    console.log("Connected");
});

app.post('/login', (req, res) => {
    const username = req.body.usernameSub;
    const password = req.body.passwordSub;

    db.query("SELECT * FROM userinfo WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
        if (err) {
            res.send({err: err});
        }

        if (result.length > 0) {
            res.send(result);
            // res.send({message: "Correct Info"});
        } else {
            res.send({message: "User Not Found"});
        }
    });
});

app.listen(3001, () => 
    {
        console.log("running server");        
    }
);
