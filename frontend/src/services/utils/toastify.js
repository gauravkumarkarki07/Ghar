import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Toastify(){
    const success=(message)=>{
        toast.success(message);
    }

    const error=(message)=>{
        toast.error(message);
    }

    return{success,error}
}