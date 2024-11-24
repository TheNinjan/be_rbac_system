const mysql = require('mysql2');
// module.exports = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',     
//   password: 'root',    
//   database: 'rbac_system'
// });


// Grocerz DEV
module.exports = mysql.createConnection({
  host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
  user: '4JxDG3kmktYk1RM.root',
  password: 'TKHJVIuO3EhClhkv',
  database: 'test'
});