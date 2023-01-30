const express = require('express');
const connection = require('../connection');
const router =express.Router();

const bcrypt = require('bcrypt');   // For Hash Password

// Register New Data ------------------------------

// app.post('/register', (req, res)=> {
//     const username = req.body.username;
//     const password = req.body.password;
//     bcrypt.hash(password,saltRound, (err, hash) => {
//     if (err) {
//             console.log(err)
//         }
//         db.execute( 
//             "INSERT INTO users (username, password) VALUES (?,?)",
//             [username, hash], 
//             (err, result)=> {
//                 console.log(err);
//             }
//         );
//     })
// });
//--------------------------------------------------------------

// router.post("/register",async (req, res)=>{
//     const {name, email, password} =req.body;
//     const saltRounds = 10;
//     const salt = bcrypt.genSaltSync(saltRounds);
//     const hashedPassword = await bcrypt.hash (password, salt);
//     const sqlInsert ="INSERT INTO user_db (name, email, password) VALUES(?, ?, ?)";
//     connection.query('SELECT * from user_db WHERE name=? or email = ?', [name, email],(err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             if (result.length > 0) {
//                 res.send({message:"1"})
//                 // res.send({message:"Email address already Exist!!"})  // If you want to send this message to the frontend
//                 return;
//             }
                
//                 connection.query(sqlInsert, [name, email, hashedPassword], (error, result)=>{
//                             console.log(error);
//                             res.send({message:"2"})
//                             // res.send({message:"User Added successfully!!"}) // If you want to send this message to the frontend

//                             });
//             }
//         })
        
// });
//---------------------------------------

router.post("/register",async (req, res)=>{
    const {name, email, password} =req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await bcrypt.hash (password, salt);
    const sqlInsert ="INSERT INTO user_db (name, email, password) VALUES(?, ?, ?)";
    connection.query('SELECT * from user_db WHERE name=? or email = ?', [name, email],(err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length > 0) {
                res.send({message:"1"})
                // res.send({message:"Email address already Exist!!"})  // If you want to send this message to the frontend
                return;
            }
                
                connection.query(sqlInsert, [name, email, hashedPassword], (error, result)=>{
                            console.log(error);
                            console.log(hashedPassword);
                            res.send({message:"2"})
                            // res.send({message:"User Added successfully!!"}) // If you want to send this message to the frontend

                            });
            }
        })
        
});


//Loging -------------------

// router.post("/login", async(req, res)=>{
//     const {email, password} =req.body;
//     bcrypt.compareSync(password, hashedPassword);
//     connection.query("SELECT * FROM user_db WHERE email=? AND password = ?", 
//     [email, password],
//      (err, result) => {
//         if (err) {
//             res.send({err:err});
//         } 
//         if(result.length >0){
//             res.send(result);
//         }
//         else {
//             res.send({message:"WrongEmail & Password. Try Again!! "});
//                 }
//             }
//             );
// });

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    connection.query(
           "SELECT * FROM user_db WHERE email = ?;",
           [email], 
           (err, result)=> {
               if (err) {
                   res.send({err: err});
               }
               if (result.length > 0) {
                   bcrypt.compare(password, result[0].password, (error, response) => {
                       if (response) {
                        //    req.session.user = result;
                        //    console.log(req.session.user);
                           res.send(result);
                       } else{
                           res.send({message: "Wrong username/ password comination!"}); 
                       }
                   });
               } else {
                   res.send({ message: "User doesn't exists"});
               }
           }
       );
   });

// Gell All Data --------------------------------------------

router.get("/get", (req, res)=>{
    const sqlGet = "SELECT * FROM user_db";
    connection.query(sqlGet, (error, result)=>{
        res.send(result);
    });
});


 
module.exports = router;