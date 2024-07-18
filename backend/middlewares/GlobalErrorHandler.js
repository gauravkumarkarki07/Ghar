// Global Error Handler
export const GlobalErrorHandler=(err,req,res,next)=>{
    const errStatusCode=err.statusCode || 500;
    const errMessage=err.message || "Internal Server Error";
    return res.status(errStatusCode).json({
        success:false,
        statusCode:errStatusCode,
        message:errMessage
    })
}