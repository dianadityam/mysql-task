const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qw216587',
    database: 'dian_db'
});

module.exports = connection;