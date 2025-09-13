import Employeedb from "../models/employee.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtKey = process.env.JWT_SECRET_KEY;

const SignupUser = async(req,res) =>{
    const {contact, email ,password}=req.body;
    try{
        const ExistingUser = await Employeedb.findOne({email});
        if(ExistingUser){
            return res.status(500).json({message:"User already exists"});
        }
        const salt = await bcrypt.genSalt(12);
        const hashedPass = await bcrypt.hash(password, salt);

        const user = new Employeedb({
            contact,
            email,
            password:hashedPass,
        });
        await user.save();

        const payload = {
            user:{
                email:user.email,
                contact:user.contact
            }
        }

        const jwtToken = jwt.sign(payload,jwtKey,{expiresIn:"2h"});
        res.json({ message: 'Signup successful', jwtToken });
    }
    catch(error){
        console.log(error);
    }
}

export default SignupUser;