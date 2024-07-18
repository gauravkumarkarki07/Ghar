import {PropertyEndPoints} from '../apiRequest/EndPoints.js';
import ApiRequestManager from '../apiRequest/ApiRequestManager.js';

export default function Loaders(){

    const {getRequest}=ApiRequestManager();

    // Get Properties
    const GetPropertiesLoader=async(page)=>{
        const response=await getRequest(PropertyEndPoints.GetProperties(page||1));
        return response || null
    }

    const GetSavedProperties=async()=>{
        const response=await getRequest(PropertyEndPoints.GetSavedProperties(1));
        return response || null
    }

    const GetListedProperties=async()=>{
        const response=await getRequest(PropertyEndPoints.GetListedProperties(1));
        return response || null
    }

    return{GetPropertiesLoader,GetSavedProperties,GetListedProperties}

}