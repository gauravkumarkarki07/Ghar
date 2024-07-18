import Toastify from "../utils/toastify";

const{success,error}=Toastify();


const getHeaders=()=>{
    return {
        "Content-Type":"application/json"
    }
}

const handleResponse=async(response)=>{
    const responseData=await response.json();
    if(response.ok){
        success(responseData.message);
        return responseData;
    }
    error(responseData.message);
    throw new Error
}

export default function ApiRequestManager(){


    const postRequest =async(url,data={})=>{
        try {
            const response=await fetch(url,{
                method:"POST",
                headers:getHeaders(),
                body:JSON.stringify(data),
                credentials:'include'
            })
            return handleResponse(response);
        } catch (error) {
            throw new Error
        }

    }

    const getRequest=async(url)=>{
        try {
            const response=await fetch(url,{
                method:"GET",
                headers:getHeaders(),
                credentials:'include'
            })
            return handleResponse(response);
        } catch (error) {
            throw new Error
        }
    }

    const putRequest=async(url,data)=>{
        try {
            const response=await fetch(url,{
                method:"PUT",
                headers:getHeaders(),
                credentials:'include',
                body:JSON.stringify(data)
            })
            return handleResponse(response)
        } catch (error) {
            throw new Error
        }
    }

    const deleteRequest=async(url)=>{
        try {
            const response=await fetch(url,{
                method:"DELETE",
                headers:getHeaders(),
                credentials:'include'
            })
            return handleResponse(response)
        } catch (error) {
            throw new Error
        }
    }

    return {postRequest,getRequest,putRequest,deleteRequest}

}