import User from '../models/Users.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export  const signUp = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const user = await User.findOne({email})
        if(user){
            return res.status(409)
            .json({message: 'User is already registered',success: false})
        }
        const userModel = new User({name,email,password})
        userModel.password = await bcrypt.hash(password,10);
        await userModel.save();
        res.status(201)
        .json({message:"Register Success",success:true})
    }catch(err){
        res.status(500)
        .json({message:"Internal Server Error",success:false})
    }
}

export const logIn = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(403)
            .json({message: 'Email is not Registered',success: false})
        }
       const isMatch = await bcrypt.compare(password,user.password)
       if(!isMatch){
        return res.status(403)
        .json({message: 'Invalid Password',success: false})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn: '12h'
        })
        res.status(200)
        .json({
            message:"Login Success",
            sucess:true,
            token,
            email,
            name:user.name
        })
    }catch(err){
        res.status(500)
        .json({message:"Internal Server Error",success:false})
    }
}