var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'titoo',
  password : '12345678',
  database : 'boobooDB'
})