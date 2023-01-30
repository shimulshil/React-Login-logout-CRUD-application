const express = require('express');
const connection = require('../connection');
const router =express.Router();

const bcrypt = require('bcrypt');   // For Hash Password

// Register New Data ------------------------------

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

//Loging section -------------------

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

 //----------------------------------------------------------------------------------
// Get data from another Mysql Table in same database "contact_db"
router.get("/get/all", (req, res)=>{
    const sqlGet = "SELECT * FROM contact_db";
    connection.query(sqlGet, (error, result)=>{
        res.send(result);
    });
});
// Delete data from another Mysql Table in same database "contact_db"
router.delete("/remove/:id", (req, res)=>{
    const {id} =req.params;
    const sqlRemove =" DELETE FROM contact_db  WHERE id=?";
    connection.query(sqlRemove, id, (error, result)=>{
        if(error){
            console.log(error);
        }
    });
});

// Add data in another Mysql Table in same database "contact_db"

router.post("/add", (req, res)=>{
    const {name, email, contact} =req.body;
    const sqlInsert ="INSERT INTO contact_db (name, email, contact) VALUES(?, ?, ?)";
    connection.query(sqlInsert, [name, email, contact], (error, result)=>{
        if(error){
            console.log(error);
        }
    });
});


// Get data by ID in another Mysql Table in same database "contact_db"
router.get("/get/:id", (req, res)=>{
    const {id}= req.params;
    const sqlGet = "SELECT * FROM contact_db WHERE id=?";
    connection.query(sqlGet, id, (error, result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

// Update the data in another Mysql Table in same database "contact_db"
router.put("/update/:id", (req, res)=>{
    const {id}= req.params;
    const {name, email, contact}= req.body;
    const sqlUpdate = "UPDATE contact_db SET name=?, email=?, contact=? WHERE id=?";
    connection.query(sqlUpdate, [name, email, contact, id], (error, result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});


 
module.exports = router;