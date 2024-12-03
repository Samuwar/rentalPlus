const express = require('express')
const UserModel = require('../../models/v1/userModel')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid');

const users = [{name: "Abimbola", password: "password"}]

// @desc - POST Create new user
// @route - POST /user/signup
// @access public
const createUserHandler = async (req, res, next) => {
    const { name, gender, age, email } = req.body;

    // VALIDATION
    if(typeof name !== "string"){
        res.status(500).json({message: "Name must be a string"});
        return;
    }
    if(typeof gender != "string"){
        res.status(500).json({message: "Name must be a string"});
        return;
    }else
    if(gender.toLowerCase() !== 'male' && gender.toLowerCase() !== 'female'){
        res.status(500).json({message: "Gender must be either Male or Female"});
        return;
    }
    if(typeof age !== 'number'){
        res.status(500).json({message: "Age must be a number"});
        return;
    }else
    if(age < 18 ){
        res.status(500).json({message: "You must be 18 years old or above"});
    }
    if(typeof email !== 'string'){
        res.status(500).json({message: "Email must be a string"});
        return;
    }

    data.user_id = uuidv4()
    console.log(data)
    data.password = await bcrypt.hash(data.password, 10)
    UserModel.create(data).then(function(user){
        res.send(user);
    }).catch (next);
}

// @desc - GET Retrieve users
// @route - GET /user
// @access public
const getUserHandler = async (req, res, next) => {
    let searchParams = {};
    // @usage - if query param is set
    // @desc - to search for user
    const data = req.query;
    if(data.email){
        searchParams.email = new RegExp(data.email, 'i');
    }
    if(data.username){
        searchParams.username = new RegExp(data.username, 'i');
    }
    if(data.firstname){
        searchParams.firstname = new RegExp(data.firstname, 'i');
    }
    try {
        const users = await UserModel.find(searchParams)
        if(users.length <= 0){
            res.send("No user found")
        }else{
            res.send(users);
        }
    } catch (error){
        res.status(500).json({message: "an error occured"})
    }
}

// @desc - PUT Update user
// @route - PUT /user/:id
// @access public
const updateUserHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        UserModel.findByIdAndUpdate(id, req.body).then(function(){
            UserModel.findById(id).then(function(user){
                res.send(user);
            }).catch(next)
        })
    } catch (error) {
        res.status(500).json({message: "an error occured"})
    }
}

// @desc - DELETE Delete user
// @route - DELETE /user/:id
// @access public
const deleteUserHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        UserModel.findByIdAndDelete(id).then(function(user){
            res.send({message: "Successfully deleted", user})
        }).catch (next)
    } catch (error) {
        res.status(500).json({message: "an error occured"})
    }
}

// @desc Login user
// @route POST /user/login
// @access public
const loginUserHandler = async (req, res) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({email});
    if(user == null){
        return res.status(400).send("User not found");
    }
    try {
        if(await bcrypt.compare(password, user.password)){
            res.send("Login Successfully")
        }else {
            res.send("Incorrect Password")
        }
        
    } catch (error) {
        res.status(500).json({message: "an error occured"})
    }
    
}

module.exports = { createUserHandler, getUserHandler, updateUserHandler, deleteUserHandler, loginUserHandler }
