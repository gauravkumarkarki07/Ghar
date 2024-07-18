import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";
import LoginLandlordImage from "../../assets/loginLandlord.jpg";
import { FaGoogle } from "react-icons/fa";
import ApiRequestManager from '../../services/apiRequest/ApiRequestManager.js';
import {AuthEndPoints} from '../../services/apiRequest/EndPoints.js';
import {useForm} from 'react-hook-form';
import { useDispatch } from "react-redux";
import { landlordLogin } from "../../services/redux/Landlord/LandlordSlice.js";
import { useNavigate } from "react-router-dom";
import FireBaseRequest from '../../services/firebase/firebaseRequest.js';

export default function LoginLandlord() {

  const{handleGoogleSignInLandlord}=FireBaseRequest();

  const navigate=useNavigate();

  const dispatch=useDispatch();

  
  const{postRequest}=ApiRequestManager();

  const{register,handleSubmit,formState:{errors}}=useForm();

  const login=async(reactHookFormData)=>{
    const response=await postRequest(AuthEndPoints.LoginLandlord,reactHookFormData);
    if(response){
      dispatch(landlordLogin(response));
      navigate('/landlord');
    }
  }

  return (
    <section className="font-poppins px-4 py-4">
        <Link to={'/'}>
        <h1 className="text-3xl px-4 md:px-32">
            Ghar
        </h1>
        </Link>
        <section className="flex flex-col md:flex-row justify-center md:py-10">
        <form onSubmit={handleSubmit(login)} className="w-[500px] h-[600px] flex flex-col justify-evenly px-4 py-4 shadow-lg rounded-md">
          <h1 className="text-xl">Welcome Back Landlord</h1>
          <section className="flex flex-col gap-4">
            <section className="flex flex-col gap-2">
              <label className="text-sm text-gray">Username or Email</label>
              <InputField
                name={"usernameOrEmail"}
                placeholder={"Enter Your Username or Email"}
                type={"text"}
                {...register('usernameOrEmail',{required:true})}
              />
              {errors.usernameOrEmail && <span className="text-red-500 text-xs">Username Or Email required</span>}
            </section>
            <section className="flex flex-col gap-2">
              <label className="text-sm text-gray">Password</label>
              <InputField
                name={"password"}
                placeholder={"Enter Your Password"}
                type={"password"}
                {...register('password',{required:true})}
              />
              {errors.password && <span className="text-red-500 text-xs">Password is required</span>}
            </section>
          </section>
          <Button>
            Login
          </Button>
          <Button variant={'google'} type="button" onClick={handleGoogleSignInLandlord}>
            <span className="flex items-center gap-4 justify-center">
            <FaGoogle/>
            <span>
                Continue With Google
            </span>
            </span>
          </Button>
          <section>
            <span className="text-gray flex gap-2">
                Don&apos;t have an account ?
                <span>
                    <Link className="text-blue-500 hover:underline" to={'/registerlandlord'}>
                        Register
                    </Link>
                </span>
            </span>
          </section>
        </form>
      <section>
        <img
          src={LoginLandlordImage}
          className="w-[500px] h-[600px] object-cover overflow-clip rounded-md"
          loading="lazy"
          alt="House Image"
        />
      </section>
    </section>
    </section>

  );
}
