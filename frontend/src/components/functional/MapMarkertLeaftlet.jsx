import { Marker, Popup } from "react-leaflet";
import PropTypes from 'prop-types';

export default function MapMarkertLeaftlet({propertyDetails}) {
     // Validate latitude and longitude
  const isValidLatitude = propertyDetails.geoLocation.latitude >= -90 && propertyDetails.geoLocation.latitude <= 90;
  const isValidLongitude = propertyDetails.geoLocation.longitude >= -180 && propertyDetails.geoLocation.longitude <= 180;

  // If coordinates are invalid, fallback to default location
  const defaultCenter = { latitude: 0, longitude: 0 };

  if (!isValidLatitude || !isValidLongitude) {
    propertyDetails.geoLocation.latitude = defaultCenter.latitude;
    propertyDetails.geoLocation.longitude = defaultCenter.longitude;
  }
  return (
    <Marker position={[propertyDetails?.geoLocation.latitude,propertyDetails?.geoLocation.longitude]}>
        <Popup>
            <section className="w-[180px] flex flex-col gap-2">
                <img
                src={propertyDetails?.propertyImage[0]}
                    className="w-full h-1/2 rounded-lg"
                    alt="Property Image"
                />
                <article className="flex flex-col gap-1 text-xs">
                    <span className="text-lg text-primary">
                        ${propertyDetails?.price}
                        <span className="text-xs text-black">
                            /month
                        </span>
                    </span>
                    <span>
                        {propertyDetails?.address}
                    </span>
                </article>
            </section>
        </Popup>
    </Marker>
  )
}

MapMarkertLeaftlet.propTypes={
    propertyDetails:PropTypes.object
}
