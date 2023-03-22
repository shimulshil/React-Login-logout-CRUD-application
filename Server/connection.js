const mysql = require('mysql');
var connection = mysql.createConnection({
    port:3306,
    host:"localhost",
    user:"root",
    password: "root",
    database:"crud"
})

//--------------------------------------------------------------------------
// Database connection with Azure Database for Mysql 
// need to download the SSL file from azure mysql server and save in your c: drive (Ex-c:/var/www/html/BaltimoreCyberTrustRoot.crt.pem)
// https://learn.microsoft.com/en-us/azure/mysql/single-server/connect-nodejs

// var fs = require('fs');
// var mysql = require('mysql');
// const serverCa = [fs.readFileSync("/var/www/html/BaltimoreCyberTrustRoot.crt.pem", "utf8")];
// var connection=mysql.createConnection({
//     host:"az-900-sql-server.mysql.database.azure.com",
//     user:"shimul",
//     password:"Aradho21",
//     database:"crud",
//     port:3306,
//     ssl: {
//         rejectUnauthorized: true,
//         ca: serverCa
//     }
// })
//-------------------------------------------------------------------------

connection.connect((err)=>{
    if(!err){
        console.log(' & connected successfully');
    }else
    console.log(err,"Server not connected");
})

module.exports =connection;
