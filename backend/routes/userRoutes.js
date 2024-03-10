import express from "express";
import mongoose from "mongoose";
import User from "../models/userModel.js";
const app=express();
const router=express.Router();

router.get("/",(req,res)=>
{
    const users=[];
    User.find().sort({name:1})
    .then(data => {
        data.forEach(user => {
            users.push(user);
        })
        res.status(200).json(users);
    })
});
    
router.get("/search/:id", (req,res)=>{
    const id = req.params.id;
    User.findOne( {_id:id})
    .then(
        user => {
            if(!user){
                res.status(400).json({message:"No user found"});
            }
            else{
                res.status(200).json(user);
            }
        }
    );
});

// Create a new user
router.post("/create", async (req, res) => {
    const { name, email, age } = req.body;
    try {
        const userData = await User.create({
            name: name,
            email: email,
            age: age
        });
        res.status(201).json(userData);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(400).json({error : error.message});
    }
});

// Update an existing user by id
router.patch('/update/:id', (req, res) => {
    let update = req.body;
    let id = req.params.id;
    
    User
      .findByIdAndUpdate(id, {$set : update}) // $set is used for updating specific fields in a document
      .then(()=>{
          res.json(`User with an id of ${id} has been updated`);
      }).catch((e)=>console.log(e));
      });
// Delete a user by id
router.delete('/delete/:id',(req,res) => {
    const id = req.params.id;
    User.deleteOne({_id: id})
    .then((result) => {
      if(result) {
        res.send('User deleted!');
      }
      else{
        console.log('Error deleting user:');
      }
      })
});
export default router;