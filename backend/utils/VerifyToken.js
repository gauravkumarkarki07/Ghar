import { ErrorHandler } from "../middlewares/ErrorHandler.js";
import jwt from 'jsonwebtoken';

//Verify token
export const VerifyToken=async(req,res,next)=>{
    const token=req.cookies.access_token;
    try {
        if(!token){
            return next(ErrorHandler(400,'Please login first'))
        }
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,token)=>{
            if(err){
                return next(ErrorHandler(404,'You are unauthorized'));
            }
            req.token=token;
            next();
        })
    } catch (error) {
        next(error)
    }
}