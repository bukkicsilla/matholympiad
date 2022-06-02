const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: "remotemysql.com", 
  user: "sEL7t6gsNq",
  password: "Dp7dwUchUX",
  database: "sEL7t6gsNq"
})

module.exports = pool
