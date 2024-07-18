// Error Handler with specific code which is then passed to Global Error Handler
export const ErrorHandler=(statusCode,message)=>{
    const error=new Error();
    error.statusCode=statusCode;
    error.message=message;
    return error;
}