import { ErrorHandler } from "../middlewares/ErrorHandler.js";
import TenantModel from "../models/TenantModel.js";
import bcryptjs from 'bcryptjs';

//Update Profile Details
export const UpdateProfileDetails=async(req,res,next)=>{
    const{username,email,firstname,lastname,profilePicture}=req.body;
    try {
        if(req.body.tenantId!==req.token.id){
            return next(ErrorHandler(404,'You cannot update this profile'));
        }
        const existUsername=await TenantModel.findOne({username:username});
        if(existUsername && existUsername.id!==req.token.id){
            return next(ErrorHandler(400,'Username is already taken'));
        }
        const existEmail=await TenantModel.findOne({email:email});
        if(existEmail && existEmail.id!==req.token.id){
            return next(ErrorHandler(400,'Email is already taken'));
        }
        const updatedTenant=await TenantModel.findByIdAndUpdate(req.token.id,{
            firstname:firstname,
            lastname:lastname,
            email:email,
            username:username,
            profilePicture:profilePicture
        },{new:true})
        
        if(!updatedTenant){
            return next(ErrorHandler(400,'Tenant not found'));
        }
        const{password:exclude,...tenantDetails}=updatedTenant._doc;
        res.status(201).json({
            tenantDetails:tenantDetails,
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
        if(req.body.tenantId!==req.token.id){
           return next(ErrorHandler(404,'You are not allowed to change this password'));
        }
        const validTenant=await TenantModel.findById(req.token.id);
        if(!validTenant){
            return next(ErrorHandler(400,'Tenant doesnt exists'));
        }
        const validPassword=bcryptjs.compareSync(password,validTenant.password);
        if(!validPassword){
            return next(ErrorHandler(404,'Check your current password'));
        }
        if(newPassword!==confirmNewPassword){
            return next(ErrorHandler(404,'New password and confirm new password doesnt match'));
        }
        const sameNewPassword=bcryptjs.compareSync(newPassword,validTenant.password);
        if(sameNewPassword){
            return next (ErrorHandler(404,'New password cannot be same as previous password'));
        }
        const hashedPassword=bcryptjs.hashSync(newPassword,10);
        await TenantModel.findByIdAndUpdate(req.token.id,{
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