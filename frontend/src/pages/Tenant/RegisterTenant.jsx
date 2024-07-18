import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";
import LoginTenantImage from "../../assets/loginTenant.jpg";
import { FaGoogle } from "react-icons/fa";
import ApiRequestManager from "../../services/apiRequest/ApiRequestManager.js";
import { AuthEndPoints } from "../../services/apiRequest/EndPoints.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { landlordLogin } from "../../services/redux/Landlord/LandlordSlice.js";
import { useNavigate } from "react-router-dom";
import FirebaseRequest from "../../services/firebase/firebaseRequest.js";

export default function RegisterTenant() {

  const{handleGoogleSignIn}=FirebaseRequest();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { postRequest } = ApiRequestManager();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Register = async (reactHookFormData) => {
    const response = await postRequest(
      AuthEndPoints.RegisterTenant,
      reactHookFormData
    );
    if (response) {
      dispatch(landlordLogin(response));
      navigate("/logintenant");
    }
  };

  return (
    <section className="font-poppins px-4 py-4">
      <Link to={"/"}>
        <h1 className="text-3xl px-4 md:px-32">Ghar</h1>
      </Link>
      <section className="flex flex-col md:flex-row justify-center md:py-10">
        <form
          onSubmit={handleSubmit(Register)}
          className="w-[500px] h-[600px] flex flex-col justify-evenly px-4 py-4 shadow-lg rounded-md"
        >
          <h1 className="text-xl">Register Your Tenant Account</h1>
          <section className="flex flex-col gap-4">
            <section className="flex flex-row gap-2">
              <section className="flex flex-col gap-2">
                <label className="text-sm text-gray">First Name</label>
                <InputField
                  name={"firstname"}
                  placeholder={"First Name"}
                  type={"text"}
                  {...register("firstname", { required: true })}
                />
                {errors.firstname && (
                  <span className="text-xs text-red-500">
                    First Name is required
                  </span>
                )}
              </section>
              <section className="flex flex-col gap-2">
                <label className="text-sm text-gray">Last Name</label>
                <InputField
                  name={"lastname"}
                  placeholder={"Last Name"}
                  type={"text"}
                  {...register("lastname", { required: true })}
                />
                {errors.lastname && (
                  <span className="text-xs text-red-500">
                    Last Name is required
                  </span>
                )}
              </section>
            </section>
            <section className="flex flex-col gap-2">
              <label className="text-sm text-gray">Username</label>
              <InputField
                name={"username"}
                placeholder={"Enter Your Username"}
                type={"text"}
                {...register("username", { required: true })}
              />
              {errors.username && (
                <span className="text-xs text-red-500">
                  Username is required
                </span>
              )}
            </section>
            <section className="flex flex-col gap-2">
              <label className="text-sm text-gray">Email</label>
              <InputField
                name={"email"}
                placeholder={"Enter Your Email"}
                type={"email"}
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-xs text-red-500">Email is required</span>
              )}
            </section>
            <section className="flex flex-col gap-2">
              <label className="text-sm text-gray">Password</label>
              <InputField
                name={"password"}
                placeholder={"Enter Your Password"}
                type={"password"}
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-xs text-red-500">
                  Password is required
                </span>
              )}
            </section>
          </section>
          <Button>Login</Button>
          <Button variant={"google"} type="button" onClick={handleGoogleSignIn}>
            <span className="flex items-center gap-4 justify-center">
              <FaGoogle />
              <span>Continue With Google</span>
            </span>
          </Button>
          <section>
            <span className="text-gray flex gap-2">
              Already have an account ?
              <span>
                <Link
                  className="text-blue-500 hover:underline"
                  to={"/logintenant"}
                >
                  Login
                </Link>
              </span>
            </span>
          </section>
        </form>
        <section>
          <img
            src={LoginTenantImage}
            className="w-[500px] h-[600px] object-cover overflow-clip rounded-md"
            loading="lazy"
            alt="House Image"
          />
        </section>
      </section>
    </section>
  );
}
