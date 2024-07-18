import { useState } from "react"

export const useAutoCompleteLocation=()=>{
    const[prediction,setPredictions]=useState([]);

    //function to fetch autocomplete from google maps places api;
    const fetchPredictions=async(input)=>{
        if (!window.google || !window.google.maps || !window.google.maps.places || !window.google.maps.places.AutocompleteService) {
            console.error('Google Maps Places API is not available');
            return;
          }
        const autocompleteService=new window.google.maps.places.AutocompleteService();

        autocompleteService.getPlacePredictions(
            {input},
            (prediction,status)=>{
                if(status==window.google.places.PlacesServiceStatus.OK){
                    setPredictions(prediction)
                }
                else{
                    console.log('Error fetching predictions from google api')
                }
            }
        )
    }

    return{prediction,fetchPredictions}

}