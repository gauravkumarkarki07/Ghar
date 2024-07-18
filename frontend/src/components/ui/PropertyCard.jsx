import { FaRegHeart } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { PiToiletLight } from "react-icons/pi";
import { BsHouseGear } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ApiRequestManager from "../../services/apiRequest/ApiRequestManager.js";
import { PropertyEndPoints } from "../../services/apiRequest/EndPoints.js";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function PropertyCard({ property}) {

  const savedProperties = useSelector(
    (state) => state.Tenant.TenantSession?.tenantDetails?.savedProperties
  );


  const { putRequest } = ApiRequestManager();

  const SaveToogle = async () => {
    await putRequest(PropertyEndPoints.SavePropertyToggle(property._id));
  };

  const isSaved = savedProperties?.includes(property._id);

  return (
    <section className="flex flex-col border border-accent rounded-lg w-[350px] h-[360px] font-medium overflow-clip">
      <Link
        to={`/tenant/propertydetails/${property._id}`}
        state={{ propertyDetails: property }}
      >
        <img
          src={property?.propertyImage[0]}
          loading="lazy"
          className="w-[350px] h-[198px] object-cover rounded-lg hover:scale-105 ease-in-out transition-all duration-200"
        />
      </Link>
      <section className="h-[45%] px-4 py-3 flex flex-col gap-2">
        <section className="flex justify-between items-center">
          <span className="text-primary text-xl font-medium">
            ${property?.price}
            <span className="text-gray text-sm">/monthly</span>
          </span>
          {isSaved
            ?(
              <span onClick={SaveToogle} className="cursor-pointer hover:scale-110 text-primary">
              <FaHeart/>
            </span>
            ):(
              <span onClick={SaveToogle} className="cursor-pointer hover:scale-110">
              <FaRegHeart/>
            </span>
            )
          }
        </section>
        <address className="flex items-center gap-1 text-lg not-italic">
          <IoLocationOutline />
          <span className="truncate">{property?.address}</span>
        </address>
        <span className="text-gray truncate">Title: {property?.title}</span>
        <hr className="text-accent" />
        <section className="flex justify-between text-gray">
          <section className="flex gap-2 items-center">
            <IoBedOutline />
            {property?.bedRooms}
          </section>
          <section className="flex gap-2 items-center">
            <PiToiletLight />
            {property?.bathRooms}
          </section>
          <section className="flex gap-2 items-center">
            <BsHouseGear />
            {property?.propertyType}
          </section>
          <section className="flex gap-2 items-center">
            <MdOutlineSettings />
            {property?.rentType}
          </section>
        </section>
      </section>
    </section>
  );
}

PropertyCard.propTypes = {
  property: PropTypes.object,
};
