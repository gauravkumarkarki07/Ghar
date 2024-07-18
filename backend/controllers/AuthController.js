import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import TenantModel from '../models/TenantModel.js';
import LandlordModel from '../models/LandlordModel.js';
import {ErrorHandler} from '../middlewares/ErrorHandler.js';

//Register Tenant
export const RegisterTenant=async(req,res,next)=>{
    const{username,email,firstname,lastname,password}=req.body;
    try {
        const existUsername=await TenantModel.findOne({username:username});
        if(existUsername){
            return next(ErrorHandler(400,'Username already exists'));
        }
        const existEmail=await TenantModel.findOne({email:email});
        if(existEmail){
           return next(ErrorHandler(400,'Email already exists'));
        }
        const hashedPassword=bcryptjs.hashSync(password,10);
        const newTenant=new TenantModel({
            username:username,
            email:email,
            firstname:firstname,
            lastname:lastname,
            password:hashedPassword
        })
        await newTenant.save();
        res.status(201).json({
            message:`${username} successfully registered as tenant`
        })
    } catch (error) {
        next(error);
    }
}

//Register Landlord
export const RegisterLandlord=async(req,res,next)=>{
    const{username,email,firstname,lastname,password}=req.body;
    try {
        const existUsername=await LandlordModel.findOne({username:username});
        if(existUsername){
            return next(ErrorHandler(400,'Username already exists'));
        }
        const existEmail=await LandlordModel.findOne({email:email});
        if(existEmail){
           return next(ErrorHandler(400,'Email already exists'));
        }
        const hashedPassword=bcryptjs.hashSync(password,10);
        const newLandlord=new LandlordModel({
            username:username,
            email:email,
            firstname:firstname,
            lastname:lastname,
            password:hashedPassword
        })
        await newLandlord.save();
        res.status(201).json({
            message:`${username} successfully registered as landlord`
        })
    } catch (error) {
        next(error);
    }
}

//Login Tenant
export const LoginTenant=async(req,res,next)=>{
    const{usernameOrEmail,password}=req.body;
    try {
        const validTenant=await TenantModel.findOne({
            $or:[
                {username:usernameOrEmail},
                {email:usernameOrEmail}
            ]
        })
        if(!validTenant){
            return next(ErrorHandler(404,'Username or Email doesnot exists'));
        }
        const validPassword=bcryptjs.compareSync(password,validTenant.password);
        if(!validPassword){
            return next(ErrorHandler(404,'Check your password'));
        }
        const token=jwt.sign({id:validTenant._id},process.env.JWT_SECRET_KEY);
        const{password:exclude,...tenantDetails}=validTenant._doc;
        res.cookie('access_token',token,{httpOnly:true});
        res.status(200).json({
            tenantDetails:tenantDetails,
            message:'Login Successfull'
        })
    } catch (error) {
        next(error)
    }
}   

//Login Landlord
export const LoginLandlord=async(req,res,next)=>{
    const{usernameOrEmail,password}=req.body;
    try {
        const validLandlord=await LandlordModel.findOne({
            $or:[
                {username:usernameOrEmail},
                {email:usernameOrEmail}
            ]
        })
        if(!validLandlord){
            return next(ErrorHandler(404,'Username or Email doesnot exists'));
        }
        const validPassword=bcryptjs.compareSync(password,validLandlord.password);
        if(!validPassword){
            return next(ErrorHandler(404,'Check your password'));
        }
        const token=jwt.sign({id:validLandlord._id},process.env.JWT_SECRET_KEY);
        const{password:exclude,...landlordDetails}=validLandlord._doc;
        res.cookie('access_token',token,{httpOnly:true});
        res.status(200).json({
            landlordDetails:landlordDetails,
            message:'Login Successfull'
        })
    } catch (error) {
        next(error)
    }
}

//Sign in Using Google For Tenant
export const GoogleSignIn=async(req,res,next)=>{
    const{email,displayName,photoURL}=req.body;
    try {
        const validTenant=await TenantModel.findOne({email:email});
        if(validTenant){
            const{password:exclude,...tenantDetails}=validTenant._doc;
            const token=jwt.sign({id:validTenant._id},process.env.JWT_SECRET_KEY);
            res.cookie('access_token',token,{httpOnly:true})
                .status(200).json({
                    tenantDetails:tenantDetails,
                    message:"Login Successfull wtih Google"
                })
            return
        }
        const generetedUsername=displayName.replace(/ /g, '').toLowerCase();
        const fullName=displayName.split(" ");
        const firstName=fullName[0];
        const lastName=fullName[fullName.length - 1] || firstName;
        const generatedPassword=Math.random().toString(36).slice(-8);
        const hashedPassword=bcryptjs.hashSync(generatedPassword,10);
        const newTenant=new TenantModel({
            email:email,
            firstname:firstName,
            lastname:lastName,
            username:generetedUsername,
            password:hashedPassword,
            profilePicture:photoURL
        })
        await newTenant.save()
        const{password:exclude,...tenantDetails}=newTenant._doc;
        const token=jwt.sign({id:newTenant._id},process.env.JWT_SECRET_KEY);
            res.cookie('access_token',token,{httpOnly:true})
                .status(200).json({
                    tenantDetails:tenantDetails,
                    message:"Registered Successfully with Google"
                })
        return

    } catch (error) {
        next(error)
    }
}


//Sign in Using Google For Landlord
export const GoogleSignInLandlord=async(req,res,next)=>{
    const{email,displayName,photoURL}=req.body;
    try {
        const validLandlord=await LandlordModel.findOne({email:email});
        if(validLandlord){
            const{password:exclude,...landlordDetails}=validLandlord._doc;
            const token=jwt.sign({id:validLandlord._id},process.env.JWT_SECRET_KEY);
            res.cookie('access_token',token,{httpOnly:true})
                .status(200).json({
                    landlordDetails:landlordDetails,
                    message:"Login Successfull wtih Google"
                })
            return
        }
        const generetedUsername=displayName.replace(/ /g, '').toLowerCase();
        const fullName=displayName.split(" ");
        const firstName=fullName[0];
        const lastName=fullName[fullName.length - 1] || firstName;
        const generatedPassword=Math.random().toString(36).slice(-8);
        const hashedPassword=bcryptjs.hashSync(generatedPassword,10);
        const newLandlord=new LandlordModel({
            email:email,
            firstname:firstName,
            lastname:lastName,
            username:generetedUsername,
            password:hashedPassword,
            profilePicture:photoURL
        })
        await newLandlord.save()
        const{password:exclude,...landlordDetails}=newLandlord._doc;
        const token=jwt.sign({id:newLandlord._id},process.env.JWT_SECRET_KEY);
            res.cookie('access_token',token,{httpOnly:true})
                .status(200).json({
                    landlordDetails:landlordDetails,
                    message:"Registered Successfully with Google"
                })
        return

    } catch (error) {
        next(error)
    }
}

//Logout Session
export const Logout=async(req,res,next)=>{
    try {
        if(!req.cookies.access_token){
            return next(ErrorHandler(400,'You are not logged in'))
        }
        res.clearCookie('access_token').status(200).json({
            message:"Logout Successfull"
        })
        return
    } catch (error) {
        next(error)
    }
}