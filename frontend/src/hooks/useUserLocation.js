import { useEffect, useState } from "react"

export const useUserLocation=()=>{
    const[userLocation,setUserLocation]=useState({
        latitude:null,
        longitude:null
    });

    useEffect(()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (position)=>{
                    const {latitude,longitude}=position.coords;
                    setUserLocation({latitude,longitude})
                },
                (err)=>{
                    console.log(err)
                }
            )
        }
    },[])

    return{userLocation};
    
}