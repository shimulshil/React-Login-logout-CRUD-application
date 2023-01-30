const mysql = require('mysql');
var connection = mysql.createConnection({
    port:3306,
    host:"localhost",
    user:"root",
    password: "root",
    database:"crud"
})

connection.connect((err)=>{
    if(!err){
        console.log(' & connected successfully');
    }else
    console.log(err,"Server not connected");
})

module.exports =connection;