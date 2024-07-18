import { useSelector } from 'react-redux';
import MapLeaftlet from "../components/functional/MapLeaftlet";
import PropertyCard from "../components/ui/PropertyCard";
import PropTypes from "prop-types";
import { useUserLocation } from "../hooks/useUserLocation";

export default function Properties({property}) {
  const { userLocation } = useUserLocation();
  const searchedLocation = useSelector(state => state.Property.searchedLocation);

    // Use searched location if available, otherwise use user location
    const mapCenter = searchedLocation || userLocation;

  if(!mapCenter || (!mapCenter.latitude && !mapCenter.longitude)) {
    return <h1 className="text-3xl">Please turn on your location or search for a location</h1>
  }


  return (
    <section className="flex">
      <section className="w-[60%] flex flex-wrap gap-10">
        {property?.properties.map((property,index) => (
          <PropertyCard key={index} property={property}/>
        ))}
      </section>
      <section className="w-[40%] h-[500px] rounded-lg overflow-clip sticky top-10">
        <MapLeaftlet 
          key={`${mapCenter.latitude}-${mapCenter.longitude}`}
          propertyDetails={property.properties} 
          location={mapCenter}
        />
      </section>
    </section>
  )
}

Properties.propTypes = {
  property: PropTypes.object
}