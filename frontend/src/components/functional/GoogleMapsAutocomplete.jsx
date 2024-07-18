import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchLocation } from '../../services/redux/Property/PropertySlice';

function GoogleMapsAutocomplete() {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        setIsLoaded(true);
        return;
      }

      if (document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]')) {
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initAutocomplete`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };

    window.initAutocomplete = () => {
      setIsLoaded(true);
    };

    loadGoogleMapsScript();

    return () => {
      delete window.initAutocomplete;
    };
  }, [API_KEY]);

  useEffect(() => {
    if (!isLoaded || !inputRef.current) return;

    const initializeAutocomplete = () => {
      try {
        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
          types: ['geocode']
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (place.geometry && place.geometry.location) {
            const location = {
              latitude: place.geometry.location.lat(),
              longitude: place.geometry.location.lng(),
              address: place.formatted_address
            };
            dispatch(searchLocation(location));
          }
        });

        return () => {
          window.google.maps.event.clearInstanceListeners(autocomplete);
        };
      } catch (error) {
        console.error('Error initializing Autocomplete:', error);
      }
    };

    // Delay the initialization slightly to ensure Google Maps API is fully loaded
    setTimeout(initializeAutocomplete, 100);
  }, [isLoaded, dispatch]);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Enter a location"
      className='w-full px-2 py-2 border focus:outline-none rounded-md'
    />
  );
}

export default GoogleMapsAutocomplete;