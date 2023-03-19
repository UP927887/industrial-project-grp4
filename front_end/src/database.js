// // MYSQL V2
// var mysql = require('mysql');

// const db = mysql.createConnection (
//     {
//         host: "localhost",
//         user: "root",
//         password: "passwordCCTV123",
//         database: "cardetectiondb"
//     }
// );

// db.connect(function(err) 
//     {
//         if (err) {
//             console.log('DB error');
//             throw err;
//             return false;
//         }
//     }
// );

// const express = require('express');
// const bodyParser = require('body-parser');
// var connection  = require('express-myconnection'); 
// var mysql = require('mysql');

// const app = express(); 
// app.use(bodyParser.json());

// app.use(
//     connection(mysql,
//     {
//         host: 'localhost', //'localhost',
//         user: 'userEHX',
//         password : 'hMmx56FN4GHpMXOl',
//         port : 3306, //port mysql
//         database:'sampledb'
//     },
//     'pool')
// ); //or single

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
