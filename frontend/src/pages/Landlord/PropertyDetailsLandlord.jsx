import { useRef, useState } from "react";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";
import { useForm } from "react-hook-form";
import { GoUpload } from "react-icons/go";
import { RxCrossCircled } from "react-icons/rx";
import FirebaseRequest from "../../services/firebase/firebaseRequest";
import { useSelector } from "react-redux";
import ApiRequestManager from "../../services/apiRequest/ApiRequestManager";
import { PropertyEndPoints } from "../../services/apiRequest/EndPoints";
import { useUserLocation } from "../../hooks/useUserLocation";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function PropertyDetailsLandlord() {
  const session = useSelector(
    (state) => state.Landlord.LandlordSession.landlordDetails
  );

  const navigate=useNavigate();

  const locationData = useLocation();
  const { propertyDetails } = locationData.state || {};

  const { putRequest,deleteRequest } = ApiRequestManager();

  const { handlePropertyImagesUpload } = FirebaseRequest();

  const imageRef = useRef();

  const handleImageUploadClick = () => {
    imageRef.current.click();
  };

  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files[0];
    setImages([...images, files]);
  };

  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const { userLocation } = useUserLocation();

  const [currentLocation, setCurrentLocation] = useState({
    latitude: propertyDetails?.geoLocation?.latitude,
    longitude: propertyDetails?.geoLocation?.longitude,
  });

  const getCurrentLocation = () => {
    setCurrentLocation({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: propertyDetails?.title,
      description: propertyDetails?.description,
      address: propertyDetails?.address,
      price: propertyDetails?.price,
      bedRooms: propertyDetails?.bedRooms,
      bathRooms: propertyDetails?.bathRooms,
      propertyType: propertyDetails?.propertyType,
      rentType: propertyDetails?.rentType,
      houseRules:{
        smokingAllowed:propertyDetails?.houseRules?.smokingAllowed,
        petAllowed:propertyDetails?.houseRules?.petAllowed
      },
      facilities: {
        balcony: propertyDetails?.facilities?.balcony,
        furnished: propertyDetails?.facilities?.furnished,
      },
      geoLocation: {
        latitude: propertyDetails?.geoLocation?.latitude,
        longitude: propertyDetails?.geoLocation?.longitude,
      },
    },
  });


  const SubmitProperty = async (reactHookFormData) => {
    const imageUrl = await handlePropertyImagesUpload(
      images,
      reactHookFormData.title,
      session._id
    );
    if(imageUrl){
      reactHookFormData.propertyImage = imageUrl;
    }
    const response=await putRequest(PropertyEndPoints.UpdatePropertyDetails(propertyDetails._id), reactHookFormData);
    if(response){
      navigate('/landlord/myproperties');
    }
  };

  if (!propertyDetails) {
    return <h1>No Property Found</h1>;
  }


  const DeleteProperty=async()=>{
    const response=await deleteRequest(PropertyEndPoints.DeleteProperty(propertyDetails._id));
    if(response){
      navigate('/landlord/myproperties');
      return
    }
  }

  return (
    <section className="max-w-[1290px] mx-auto my-6 px-4">
      <section className="flex flex-col gap-8">
        <h1 className="text-3xl">Manage Your Property Details</h1>
        <form
          onSubmit={handleSubmit(SubmitProperty)}
          className="flex flex-col gap-6"
        >
          <section className="flex flex-col gap-2">
            <label className="text-md text-gray">Title</label>
            <InputField
              name={"title"}
              type={"text"}
              placeholder={"Enter a short title for your property"}
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-sm text-red-500">Title is required</span>
            )}
          </section>
          <section className="flex flex-col gap-2">
            <label className="text-md text-gray">Description</label>
            <textarea
              className="border rounded-md px-2 py-2 h-28 resize-none"
              placeholder="write a short description of the property or rental"
              {...register("description", { required: false })}
            />
          </section>
          <section className="flex flex-col gap-2">
            <label className="text-md text-gray">Address</label>
            <InputField
              placeholder={"Your Property Address"}
              {...register("address", { required: true })}
            />
            {errors.address && (
              <span className="text-sm text-red-500">Address is required</span>
            )}
          </section>
          {/* Details */}
          <section className="flex flex-col gap-2 border px-4 py-4 border-accent rounded-md">
            <h2 className="text-lg font-semibold">Property Details</h2>
            <section className="flex flex-col md:flex-row gap-6">
              <section className="flex flex-col gap-2">
                <label className="text-md text-gray">
                  Price
                  <span className="text-xs">/month</span>
                </label>
                <InputField
                  name={"price"}
                  type={"number"}
                  placeholder={"Price per month"}
                  {...register("price", { required: true })}
                />
                {errors.price && (
                  <span className="text-sm text-red-500">Required</span>
                )}
              </section>
              <section className="flex flex-col gap-2">
                <label className="text-md text-gray">Bed Rooms</label>
                <InputField
                  name={"bedRooms"}
                  type={"number"}
                  placeholder={"Number of bedrooms"}
                  {...register("bedRooms", { required: true })}
                />
                {errors.bedRooms && (
                  <span className="text-sm text-red-500">Required</span>
                )}
              </section>
              <section className="flex flex-col gap-2">
                <label className="text-md text-gray">Bath Rooms</label>
                <InputField
                  name={"bathRooms"}
                  type={"number"}
                  placeholder={"Number of bathrooms"}
                  {...register("bathRooms", { required: true })}
                />
                {errors.bathRooms && (
                  <span className="text-sm text-red-500">Required</span>
                )}
              </section>
              <section className="flex flex-col gap-2">
                <label className="text-md text-gray">Property Type</label>
                <select
                  className="px-4 py-2 text-gray border rounded-md md:w-[280px] focus:outline-none"
                  {...register("propertyType", {
                    required: true,
                    validate: (value) => value !== "",
                  })}
                >
                  <option value={""}>Select Property Type</option>
                  <option value={"house"}>house</option>
                  <option value={"apartment"}>apartment</option>
                </select>
                {errors.propertyType && (
                  <span className="text-sm text-red-500">Required</span>
                )}
              </section>
              <section className="flex flex-col gap-2">
                <label className="text-md text-gray">Rent Type</label>
                <select
                  className="px-4 py-2 text-gray border rounded-md md:w-[280px] focus:outline-none"
                  {...register("rentType", {
                    required: true,
                    validate: (value) => value !== "",
                  })}
                >
                  <option value={""}>Select Rent Type</option>
                  <option value={"room"}>room</option>
                  <option value={"whole"}>whole</option>
                  <option value={"sharing"}>sharing</option>
                </select>
                {errors.rentType && (
                  <span className="text-sm text-red-500">Required</span>
                )}
              </section>
            </section>
          </section>
          <section className="flex flex-col md:flex-row gap-6">
            {/* House Rules */}
            <section className="flex flex-col gap-2 px-4 py-2 border rounded-md border-accent">
              <h2 className="text-lg font-semibold">House Rules</h2>
              <section className="flex flex-col gap-6">
                <section className="flex flex-col gap-2">
                  <label className="text-md text-gray">Smoking Allowed</label>
                  <select
                    className="px-4 py-2 text-gray border rounded-md md:w-[280px] focus:outline-none"
                    {...register("houseRules.smokingAllowed", {
                      required: true,
                    })}
                  >
                    <option value={""}>Select an option</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                  {errors.houseRules?.smokingAllowed && (
                    <span className="text-sm text-red-500">Required</span>
                  )}
                </section>
                <section className="flex flex-col gap-2">
                  <label className="text-md text-gray">Pets Allowed</label>
                  <select
                    className="px-4 py-2 text-gray border rounded-md md:w-[280px] focus:outline-none"
                    {...register("houseRules.petAllowed", { required: true })}
                  >
                    <option value={""}>Select an option</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                  {errors.houseRules?.petAllowed && (
                    <span className="text-sm text-red-500">Required</span>
                  )}
                </section>
              </section>
            </section>

            {/* Facilities */}
            <section className="flex flex-col gap-2 px-4 py-2 border rounded-md border-accent">
              <h2 className="text-lg font-semibold">Facilities</h2>
              <section className="flex flex-col gap-6">
                <section className="flex flex-col gap-2">
                  <label className="text-md text-gray">Balcony</label>
                  <select
                    className="px-4 py-2 text-gray border rounded-md md:w-[280px] focus:outline-none"
                    {...register("facilities.balcony", { required: true })}
                  >
                    <option value={""}>Select an option</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                  {errors.facilities?.balcony && (
                    <span className="text-sm text-red-500">Required</span>
                  )}
                </section>
                <section className="flex flex-col gap-2">
                  <label className="text-md text-gray">Furnished</label>
                  <select
                    className="px-4 py-2 text-gray border rounded-md md:w-[280px] focus:outline-none"
                    {...register("facilities.furnished", { required: true })}
                  >
                    <option value={""}>Select an option</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                  {errors.facilities?.furnished && (
                    <span className="text-sm text-red-500">Required</span>
                  )}
                </section>
              </section>
            </section>

            {/* Geo Location */}
            <section className="flex flex-col gap-2 px-4 py-2 border rounded-md border-accent">
              <h2 className="text-lg font-semibold">Property Geo-Location</h2>
              <section className="flex flex-col gap-6">
                <section className="flex flex-col gap-2">
                  <label className="text-md text-gray">Latitude</label>
                  <InputField
                    type={"text"}
                    placeholder={"latitude"}
                    {...register("geoLocation.latitude", { required: true })}
                    value={currentLocation.latitude}
                    onChange={(e)=>setCurrentLocation({...location,latitude:e.target.value})}
                  />
                  {errors.geoLocation?.latitude && (
                    <span className="text-sm text-red-500">Required</span>
                  )}
                </section>
                <section className="flex flex-col gap-2">
                  <label className="text-md text-gray">Longitude</label>
                  <InputField
                    type={"text"}
                    placeholder={"longitude"}
                    {...register("geoLocation.longitude", { required: true })}
                    value={currentLocation.longitude}
                    onChange={(e)=>setCurrentLocation({...location,longitude:e.target.value})}
                  />
                  {errors.geoLocation?.longitude && (
                    <span className="text-sm text-red-500">Required</span>
                  )}
                </section>
                <Button type="button" onClick={getCurrentLocation}>
                  Get current location
                </Button>
              </section>
            </section>
          </section>
          {/* Property Image */}
          <section className="flex flex-col border px-4 py-4 border-accent rounded-md">
            <h2 className="text-lg font-semibold">Add Property Images</h2>
            <section className="flex items-center justify-center">
              <input
                name="file"
                type="file"
                accept="image/*"
                multiple
                ref={imageRef}
                hidden
                onChange={handleImageChange}
              />
              <section className="flex flex-col items-center justify-center gap-2">
                <GoUpload
                  className="text-6xl text-secondary hover:scale-105 cursor-pointer"
                  onClick={handleImageUploadClick}
                />
                <p className="text-lg">Select Images</p>
              </section>
            </section>
            {/* Showing images */}
            <section className="flex flex-wrap gap-2">
              {Array.isArray(images) &&
                images?.map((img, index) => (
                  <section key={index} className="relative">
                    <img
                      src={URL.createObjectURL(img)}
                      alt="Property Images"
                      className="w-32 h-32"
                    />
                    <span
                      className="absolute top-0 right-0 bg-white rounded-full"
                      onClick={() => handleImageRemove(index)}
                    >
                      <RxCrossCircled className="text-3xl text-red-500 hover:scale-105 cursor-pointer" />
                    </span>
                  </section>
                ))}
            </section>
          </section>
          <Button>Save</Button>
          <Button variant={'danger'} type="button" onClick={DeleteProperty}>
            Delete
          </Button>
        </form>
      </section>
    </section>
  );
}
