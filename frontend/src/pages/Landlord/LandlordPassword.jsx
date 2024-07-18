import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";
import { useForm } from "react-hook-form";
import ApiRequestManager from "../../services/apiRequest/ApiRequestManager.js";
import{LandlordEndPoints} from '../../services/apiRequest/EndPoints.js';
import { useDispatch } from "react-redux";
import {logout} from '../../services/redux/Global/GlobalSlice.js';
import { useSelector } from "react-redux";

export default function LandlordPassword() {
  const session=useSelector(state=>state.Landlord.LandlordSession.landlordDetails);

  const dispatch=useDispatch();
  const{putRequest}=ApiRequestManager();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues:{
      landlordId:session._id
    }
  });


  const ChangePassword = async (reactHookFormData) => {
    const response=await putRequest(LandlordEndPoints.ChangePassword,reactHookFormData);
    if(response){
      dispatch(logout());
    }
  };

  return (
    <section className="max-w-[1290px] m-auto md:mt-2 flex flex-col gap-8">
      <h1 className="text-3xl">Change Password</h1>
      <form onSubmit={handleSubmit(ChangePassword)} className="flex flex-col gap-6">
        <section className="flex flex-col gap-2">
          <label className="text-sm text-gray">Current Password</label>
          <InputField
            name={"password"}
            placeholder={"Current Password"}
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && <span className="text-sm text-red-500">Current Password is required</span>}
        </section>
        <section className="flex flex-col gap-2">
          <label className="text-sm text-gray">New Password</label>
          <InputField
            name={"newPassword"}
            placeholder={"New Password"}
            type="password"
            {...register("newPassword", { required: true })}
          />
          {errors.newPassword && <span className="text-sm text-red-500">New Password is required</span>}
        </section>
        <section className="flex flex-col gap-2">
          <label className="text-sm text-gray">Confirm New Password</label>
          <InputField
            name={"confirmNewPassword"}
            placeholder={"Confirm New Password"}
            type="password"
            {...register("confirmNewPassword", {
              required: true,
              validate: (value) =>
                value === watch("newPassword") || "New passwords should match",
            })}
          />
          {errors.confirmNewPassword && <span className="text-sm text-red-500">{errors.confirmNewPassword.message}</span>}
        </section>
        <Button>Change Password</Button>
      </form>
    </section>
  );
}
