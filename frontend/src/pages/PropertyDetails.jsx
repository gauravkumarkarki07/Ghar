import { useLocation } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { IoBedOutline } from "react-icons/io5";
import { CiDollar } from "react-icons/ci";
import { PiToiletLight } from "react-icons/pi";
import { MdOutlineSettings } from "react-icons/md";
import { BsHouseGear } from "react-icons/bs";
import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";
import { FaSmoking } from "react-icons/fa";
import { FaSmokingBan } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { IoBan } from "react-icons/io5";
import MapLeaftlet from "../components/functional/MapLeaftlet";

export default function PropertyDetails() {
  const location = useLocation();
  const { propertyDetails } = location.state || {};

  if (!propertyDetails) {
    return <p>No property data available</p>;
  }

  return (
    <section className="max-w-[1290px] m-auto py-8 flex flex-col gap-6">
      <section className="flex gap-6">
        <img
          src={propertyDetails.propertyImage[0]}
          className="w-1/2 h-[500px] object-cover rounded-lg"
        />
        <section className="w-1/2 h-[500px] overflow-clip rounded-lg z-0">
          <MapLeaftlet
            propertyDetails={propertyDetails}
            location={propertyDetails.geoLocation}
          />
        </section>
      </section>
      <section className="flex items-start gap-6">
        <section className="flex flex-col gap-12 w-1/2">
          {/* Property Overview */}
          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Property Overview</h2>
            <span className="text-xl text-gray">
              {propertyDetails?.title}
            </span>
            <address className="not-italic text-2xl flex items-center gap-2">
              <IoLocationOutline/>
              {propertyDetails?.address}
            </address>
            <section className="flex justify-between items-center px-3 py-3 border border-accent rounded-md">
              <section className="flex flex-col gap-2 text-xl items-center">
                <CiDollar className="text-3xl" />
                <span>
                  ${propertyDetails.price}
                  <span className="text-xs">/month</span>
                </span>
              </section>
              <section className="flex flex-col gap-2 text-xl items-center">
                <IoBedOutline className="text-3xl" />
                {propertyDetails.bedRooms}
              </section>
              <section className="flex flex-col gap-2 text-xl items-center">
                <PiToiletLight className="text-3xl" />
                {propertyDetails.bathRooms}
              </section>
              <section className="flex flex-col gap-2 text-xl items-center">
                <BsHouseGear className="text-3xl" />
                {propertyDetails.propertyType}
              </section>
              <section className="flex flex-col gap-2 text-xl items-center">
                <MdOutlineSettings className="text-3xl" />
                {propertyDetails.rentType}
              </section>
            </section>
          </section>

          {/* Description */}
          <section className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">Description</h2>
            <article className="text-gray">
              <p>{propertyDetails.description}</p>
            </article>
          </section>
          {/* House Rules */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold">House Rules</h2>
            <section className="flex items-center gap-8 text-primary">
              <section className="flex items-center gap-2">
                <span>Smoking</span>
                <span>
                  {propertyDetails.houseRules.smokingAllowed ? (
                    <FaSmoking />
                  ) : (
                    <FaSmokingBan />
                  )}
                </span>
              </section>
              <section className="flex items-center gap-2">
                <span>Pets</span>
                <span>
                  {propertyDetails.houseRules.petAllowed && <TiTick />}
                  {!propertyDetails.houseRules.petAllowed && <IoBan />}
                </span>
              </section>
            </section>
          </section>
          <section className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">Facilities</h2>
            <section className="flex items-center gap-6 text-primary">
              <section className="flex gap-2 items-center">
                <span>Balcony</span>
                {propertyDetails.facilities.balcony ? <TiTick /> : <IoBan />}
              </section>
              <section className="flex gap-2 items-center">
                <span>Furnished</span>
                {propertyDetails?.facilities.furnished ? <TiTick /> : <IoBan />}
              </section>
            </section>
          </section>
        </section>
        {/* Landlord Details */}
        <section className="flex flex-col w-1/2 items-center gap-2">
          <h1 className="text-lg font-semibold">Landlord Details</h1>
          <section className="border px-4 py-2 rounded-md flex flex-col gap-2">
            <section className="flex gap-2 items-center">
              <img
                className="w-[50px] h-[50px] overflow-clip"
                src={propertyDetails?.landlord.profilePicture}
                alt="Landlord Profile Image"
              />
              <span>{propertyDetails?.landlord.firstname}</span>
              <span>{propertyDetails?.landlord.lastname}</span>
            </section>
            <InputField name={"messageme"} placeholder={"Type your message"} />
            <Button>Message Me</Button>
          </section>
        </section>
      </section>
    </section>
  );
}
