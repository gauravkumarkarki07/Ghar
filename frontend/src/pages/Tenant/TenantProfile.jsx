import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ApiRequestManager from '../../services/apiRequest/ApiRequestManager.js';
import {TenantEndPoints} from '../../services/apiRequest/EndPoints.js';
import { useDispatch } from "react-redux";
import { tenantLogin } from "../../services/redux/Tenant/TenantSlice.js";

export default function TenantProfile() {

  const dispatch=useDispatch();

  const {putRequest}=ApiRequestManager();

  const[image,setImage]=useState();

  const session = useSelector(
    (state) => state.Tenant.TenantSession.tenantDetails
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues:{
      firstname:session.firstname,
      lastname:session.lastname,
      username:session.username,
      email:session.email,
      profilePicture:session.profilePicture,
      tenantId:session._id
    }
  });

  const SaveChanges =async(reactHookFormData) => {
    const response =await putRequest(TenantEndPoints.UpdateProfile,reactHookFormData);
    if(response){
      dispatch(tenantLogin(response));
    }
  };

  return (
    <section className="max-w-[1290px] m-auto md:mt-2">
      <section className="flex flex-col px-2 py-2">
        <h1 className="text-3xl">Profile Details</h1>
        <section className="flex flex-col gap-4">
          <section className="flex flex-col items-center">
            <img src={image ? URL.createObjectURL(image) : session.profilePicture} className="w-24 h-24 my-2 border rounded-full"/>
            <input
              name="imageUpload"
              type="file"
              className="w-full px-2 py-2 border rounded-md border-accent"
              accept="image/*"
              onChange={(e)=>setImage(e.target.files[0])}
            />
          </section>
          <form
            onSubmit={handleSubmit(SaveChanges)}
            className="flex flex-col gap-6"
          >
            {/* profile picture url hidden input */}
            <input
              type="text"
              {...register('profilePicture',{required:true})}
              className="hidden"
            />
            {/* .... */}
            <section className="flex gap-4">
              <section className="flex flex-col gap-2 w-full">
                <label className="text-sm text-gray">First Name</label>
                <InputField
                  name={"firsname"}
                  placeholder={"First Name"}
                  {...register("firstname", { required: true })}
                />
                {errors.firstname && (
                  <span className="text-sm text-red-500">
                    First Name is required
                  </span>
                )}
              </section>
              <section className="flex flex-col gap-2 w-full">
                <label className="text-sm text-gray">Last Name</label>
                <InputField
                  name={"lastname"}
                  placeholder={"Last Name"}
                  {...register("lastname", { required: true })}
                />
                {errors.lastname && (
                  <span className="text-sm text-red-500">
                    Last Name is required
                  </span>
                )}
              </section>
            </section>
            <section className="flex flex-col gap-2">
              <label className="text-sm text-gray">Username</label>
              <InputField
                placeholder={"Username"}
                name={"username"}
                {...register("username", { required: true })}
              />
              {errors.username && (
                <span className="text-sm text-red-500">
                  Username is required
                </span>
              )}
            </section>
            <section className="flex flex-col gap-2">
              <label className="text-sm text-gray">Email</label>
              <InputField
                placeholder={"Email"}
                type={"email"}
                name={"email"}
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  Email is required
                </span>
              )}
            </section>
            <Button>Save Changes</Button>
          </form>
        </section>
      </section>
    </section>
  );
}
