const bcrypt = require('bcrypt');
const UserModels = require("../Models/User");
const Jwt = require('jsonwebtoken');


const signup = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const user = await UserModels.findOne({email});
        if(user){
            return res.status(409).json({message:"User already exists",success:false});
        }
        const userModel = await UserModels({name,email,password,role:"user"});
        userModel.password = await bcrypt.hash(password,10);
        await userModel.save();
        res.status(201).json({message:"Signup success", success:true});
    }catch(err){
        res.status(500).json({message:"Signup failed", success:false});
    }
}

const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await UserModels.findOne({email});
        const errormessage = "Authentication failed wrong credentials"
        if(!user){
            return res.status(403 ).json({message:errormessage,success:false});
        }
        const isPassword = await bcrypt.compare(password,user.password);
        if(!isPassword){
            return res.status(403).json({message:errormessage,success:false})
        }
        const jwtToken = Jwt.sign(
            {
                email:user.email,
                _id:user._id,
                name:user.name,
                role:user.role
            },
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        );

        res.status(200).json(
            {
                message:"Login Successful",
                success:true,
                jwtToken,
                id:user._id,
                email:email,
                name:user.name,
                role:user.role
            });

    }catch(err){
        res.status(500).json({message:"Internal server error", success:false});
    }
}


module.exports= {
    signup,login
}