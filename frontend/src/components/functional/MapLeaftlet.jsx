import { MapContainer, TileLayer } from "react-leaflet";
import MapMarkertLeaftlet from "./MapMarkertLeaftlet";
import PropTypes from 'prop-types';

export default function MapLeaftlet({ propertyDetails, location }) {
  let zoom;
  const propertyList = Array.isArray(propertyDetails) ? propertyDetails : [propertyDetails];
  zoom = Array.isArray(propertyDetails) ? 10 : 15;

  // Validate latitude and longitude
  const isValidLatitude = location.latitude >= -90 && location.latitude <= 90;
  const isValidLongitude = location.longitude >= -180 && location.longitude <= 180;

  // If coordinates are invalid, fallback to default location
  const defaultCenter = { latitude: 0, longitude: 0 };

  if (!isValidLatitude || !isValidLongitude) {
    location.latitude = defaultCenter.latitude;
    location.longitude = defaultCenter.longitude;
  }

  return (
    <div className="" id="map">
      <MapContainer center={[location.latitude, location.longitude]} zoom={zoom} scrollWheelZoom={false} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {propertyList.map((property, index) => (
          <MapMarkertLeaftlet key={index} propertyDetails={property} />
        ))}
      </MapContainer>
    </div>
  );
}

MapLeaftlet.propTypes = {
  propertyDetails: PropTypes.any,
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
};
