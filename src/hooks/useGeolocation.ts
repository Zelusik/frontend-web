import { useState, useEffect } from "react";
import { useAppSelector } from "./useReduxHooks";
import { useSearch } from "./useSearch";

interface locationType {
  loaded: boolean;
  center?: { lat: number; lng: number };
  error?: { code: number; message: string };
}

export const useGeoLocation = () => {
  const { location } = useAppSelector((state) => state.search);
  const [myLocation, setMyLocation] = useState<locationType>({
    loaded: false,
    center: location,
  });
  const { handleLocation } = useSearch();

  const onLocation = (location: {
    coords: { latitude: number; longitude: number };
  }) => {
    setMyLocation({
      loaded: true,
      center: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onMyLocation = (location: {
    coords: { latitude: number; longitude: number };
  }) => {
    handleLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    setMyLocation({
      loaded: true,
      center: {
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
      navigator.geolocation.getCurrentPosition(onLocation, onError);
    } else {
      navigator.geolocation.getCurrentPosition(onMyLocation, onError);
    }
  }, []);

  return myLocation;
};
