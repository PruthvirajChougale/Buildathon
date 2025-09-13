import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Employeedb from "../models/employee.js";
dotenv.config();

const jwtKey = process.env.JWT_SECRET_KEY;

const LoginUser =async (req,res) =>{
    try{
    const { identifier , password} = req.body;
    //console.log(identifier,password);
    let user;
    if(identifier.includes("@")){
        user = await Employeedb.findOne({email:identifier});
    }
    else{
        user = await Employeedb.findOne({contact:identifier});
    }
    if(!user){
        return res.status(400).json({message:"User not found"});
    }

    const checkPass = await bcrypt.compare(password, user.password);
    if(!checkPass){
        return res.status(401).json({message:"Check your email and password again"});
    }

    const payload={
        user:{
            email:user.email,
            contact:user.contact
        }
    }

    const jwtToken = jwt.sign(payload,jwtKey,{expiresIn:"2h"});
    res.json({message:"logged in successfully", jwtToken});
    }
    catch(error){
        console.log(error);
    }

}

export default LoginUser;