const mysql = require('mysql')
const config = require('../../etc/config.json')
module.exports = mysql.createConnection({
    host:config.db.dbHost,
    port:config.db.dbPort,
    user:config.db.dbUser,
    password:config.db.dbPass,
    database:config.db.dbName,
    charset:config.db.code,
    multipleStatements:true
})



