import { useState } from "react"

export const useInputChange=(initialData)=>{
    const[inputData,setInputData]=useState(initialData);

    const handleChange=(e)=>{
        const{name,value}=e.target;
        setInputData({...inputData,[name]:value});
    }

    return{inputData,handleChange}
}