import { ErrorHandler } from "../middlewares/ErrorHandler.js";
import bcryptjs from 'bcryptjs';
import LandlordModel from '../models/LandlordModel.js';

//Update Profile Details
export const UpdateProfileDetails=async(req,res,next)=>{
    const{username,email,firstname,lastname,profilePicture}=req.body;
    try {
        if(req.body.landlordId!==req.token.id){
            return next(ErrorHandler(404,'You cannot update this profile'));
        }
        const existUsername=await LandlordModel.findOne({username:username});
        if(existUsername && existUsername.id!==req.token.id){
            return next(ErrorHandler(400,'Username is already taken'));
        }
        const existEmail=await LandlordModel.findOne({email:email});
        if(existEmail && existEmail.id!==req.token.id){
            return next(ErrorHandler(400,'Email is already taken'));
        }
        const updatedLandlord=await LandlordModel.findByIdAndUpdate(req.token.id,{
            firstname:firstname,
            lastname:lastname,
            email:email,
            profilePicture:profilePicture
        },{new:true})

        if(!updatedLandlord){
            return next(ErrorHandler(400,'Landlord not found'));
        }
        const{password:exclude,...landlordDetails}=updatedLandlord._doc;
        res.status(201).json({
            landlordDetails:landlordDetails,
            message:"Profile Update Successfully"
        })
    } catch (error) {
        next(error)
    }
}

//Change Password
export const ChangePassword=async(req,res,next)=>{
    const{password,confirmNewPassword,newPassword}=req.body;
    try {
        if(req.body.landlordId!==req.token.id){
           return next(ErrorHandler(404,'You are not allowed to change this password'));
        }
        const validLandlord=await LandlordModel.findById(req.token.id);
        if(!validLandlord){
            return next(ErrorHandler(400,'Landlord doesnt exists'));
        }
        const validPassword=bcryptjs.compareSync(password,validLandlord.password);
        if(!validPassword){
            return next(ErrorHandler(404,'Check your current password'));
        }
        if(newPassword!==confirmNewPassword){
            return next(ErrorHandler(404,'New password and confirm new password doesnt match'));
        }
        const sameNewPassword=bcryptjs.compareSync(newPassword,validLandlord.password);
        if(sameNewPassword){
            return next (ErrorHandler(404,'New password cannot be same as previous password'));
        }
        const hashedPassword=bcryptjs.hashSync(newPassword,10);
        await LandlordModel.findByIdAndUpdate(req.token.id,{
            password:hashedPassword
        })
        res.clearCookie('access_token')
            .status(200)
            .json({
                message:"Password Changed Successfully"
            })
    } catch (error) {
        next(error)
    }
}

//