import { useState, useEffect } from "react";
import { useAppSelector } from "./useReduxHooks";
import useSearch from "./useSearch";

interface locationType {
  loaded: boolean;
  coordinates?: { lat: number; lng: number };
  error?: { code: number; message: string };
}

const useGeolocation = () => {
  const { location } = useAppSelector((state) => state.search);
  const [myLocation, setMyLocation] = useState<locationType>({
    loaded: false,
    coordinates: location,
  });
  const { locationSetting } = useSearch();

  const onSuccess = (location: {
    coords: { latitude: number; longitude: number };
  }) => {
    locationSetting({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    setMyLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error: { code: number; message: string }) => {
    setMyLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    // if (!("geolocation" in navigator)) {
    //   onError({
    //     code: 0,
    //     message: "Geolocation not supported",
    //   });
    // }

    if (location.lat !== 0 && location.lng !== 0) {
      locationSetting({
        lat: location.lat,
        lng: location.lng,
      });
      setMyLocation({
        loaded: true,
        coordinates: {
          lat: location.lat,
          lng: location.lng,
        },
      });
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }, []);

  return myLocation;
};

export default useGeolocation;
