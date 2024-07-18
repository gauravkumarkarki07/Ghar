import {GoogleAuthProvider,getAuth, signInWithPopup} from "firebase/auth"
import { firebaseApp } from "./firebaseConfig.js";
import ApiRequestManager from '../apiRequest/ApiRequestManager.js';
import {AuthEndPoints} from '../apiRequest/EndPoints.js';
import {useDispatch} from 'react-redux';
import {tenantLogin} from '../redux/Tenant/TenantSlice.js';
import {landlordLogin} from '../redux/Landlord/LandlordSlice.js';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';


import Toastify from "../utils/toastify.js";
import { useNavigate } from "react-router-dom";

const auth=getAuth(firebaseApp);

const {postRequest}=ApiRequestManager();


export default function FirebaseRequest(){
  const navigate=useNavigate();
const dispatch=useDispatch();
const {error}=Toastify();


    //Google Sign In
    const handleGoogleSignIn=async()=>{
        const provider= new GoogleAuthProvider()
        provider.setCustomParameters({prompt:'select_account'})
        try {
          const resultFromGoogle=await signInWithPopup(auth,provider);
          if(!resultFromGoogle){
            throw new Error;
          }
          console.log(resultFromGoogle.user)
          const response=await postRequest(AuthEndPoints.GoogleSignIn,resultFromGoogle.user);
          if(response){
            dispatch(tenantLogin(response));
            navigate('/tenant/properties')
          }

        } catch (err) {
          error(err.message);
        }
      }

    //Google Sign In Landlord
    const handleGoogleSignInLandlord=async()=>{
      const provider= new GoogleAuthProvider()
      provider.setCustomParameters({prompt:'select_account'})
      try {
        const resultFromGoogle=await signInWithPopup(auth,provider);
        if(!resultFromGoogle){
          throw new Error;
        }
        console.log(resultFromGoogle.user)
        const response=await postRequest(AuthEndPoints.GoogleSignInLandlord,resultFromGoogle.user);
        if(response){
          dispatch(landlordLogin(response));
          navigate('/landlord')
        }

      } catch (err) {
        error(err.message);
      }
    }

    const handlePropertyImagesUpload=async(images,landlordId,propertyTitle)=>{
      if(!images.length){
        return
      }
      try {
        const storage = getStorage(firebaseApp);
        
        const uploadPromises = images.map(async (image) => {
          const fileName = image.name;
          const imageRef = ref(storage, `landlord/${landlordId}/propertyPictures/${propertyTitle}/${fileName}`);
          await uploadBytes(imageRef, image);
          return getDownloadURL(imageRef);
        });
    
        const downloadURLs = await Promise.all(uploadPromises);
        return downloadURLs;
      } catch (err) {
        error(err.message);
      }
    }



      return{handleGoogleSignIn,handleGoogleSignInLandlord,handlePropertyImagesUpload}
}