const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { use } = require('react');
require('dotenv').config();
const sendMail = require('../utils/sendMail');

exports.register = async(req, res) => {
    const {name, email, user_id, role, level, program, department, faculty, password, dob} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            user_id, 
            email,
            role, 
            level,
            program, 
            department, 
            faculty,
            password: hashedPassword, 
            dob
        })

        await sendMail(
            email,
            "Sign in details for Educore",
            `<h3>username: ${user_id}</h3><h3>password: ${password}</h3><p>After logging well, ensure to change your password</p>`    
        )

        res.status(201).json({
            message: "Registration successful",
            data: user
        })

    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Registration failed!"
        });
    }
}

exports.login = async(req, res) => {
    const {user_id, password} = req.body;
    try {
        const user = await User.findOne(user_id);
        if(!user){
            return res.status(400).json({
                message: "User not found"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                message: "Incorrect username or password"
            })
        }

        const token = await jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )
        res.json(token);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Login failed!"
        })
    }
}

exports.getUsers = async(req, res) => {
    try{
        const users = await User.find().select("-password");
        if(!user.length){
            return res.status(400).json({
                message: "No user found",
                data: []
            })
        }
        res.status(200).json(users);
    }catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Unable to retrieve users"
        })
    }
}

exports.deleteUser = async(req, res) => {
    const {id} = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        res.status(204).json({
            message: "User successfully deleted"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete user"
        })
    }
}