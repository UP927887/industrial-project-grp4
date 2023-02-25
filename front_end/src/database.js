// https://www.youtube.com/watch?v=_n-Ai30C1qs  

export function dbConnect() {
    const {Client} = require('pg')

    const client = new Client({
        host: "localhost",
        user: "postgres",
        port: 5432,
        password: "password",
        database: "CCTVcarDetectionDB"
    })

    client.connect();

    return client;
}

export function dbSelect() {
    dbConnect.client.query(`SELECT * FROM userinfo`, (err, res )=>{
        if (!err) {
            console.log(res.rows);
        } else {
            console.log(err.message);
        }

        client.end;
    })
}