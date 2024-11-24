const mysql = require('mysql2');
// module.exports = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',     
//   password: 'root',    
//   database: 'rbac_system'
// });


// dev environment

// module.exports = mysql.createConnection({
//   host: 'sql207.infinityfree.com',
//   user: 'if0_37775797',            
//   password: "NmCRKzzQuS6xR" ,      
//   database: 'if0_37775797_rbac_system', 
//   port: 3306
// });
module.exports = mysql.createConnection({
  host: 'sql.freedb.tech',
  user: 'freedb_theninjan',            
  password: "jdjFu#8v9M&GQmr" ,      
  database: 'freedb_rbac_system', 
  port: 3306
});