import { useQuery } from "react-query";
import { useAppSelector } from "hooks/useReduxHooks";
import { getPlacesNear } from "api/places";
import {
  DAY_OF_WEEK_DATA,
  FOOD_KEYWORD,
  TASTE_KEYWORD,
} from "constants/globalData";

const useGetPlacesNear = (): any => {
  const { foodType, dayOfWeek, mood, location } = useAppSelector(
    (state) => state.search
  );

  const { data, isLoading, error, refetch } = useQuery(
    [foodType, dayOfWeek, mood, location],
    async () => {
      console.log("MapChange");
      const params: any = {
        params: {
          daysOfWeek:
            dayOfWeek.length !== 0
              ? dayOfWeek.forEach((day: any) => DAY_OF_WEEK_DATA[day])
              : undefined,
          foodCategory: foodType && TASTE_KEYWORD[foodType],
          preferredVibe: mood && FOOD_KEYWORD[mood],
          lat: location.lat,
          lng: location.lng,
          page: 0,
          size: 10,
        },
      };
      const result = await getPlacesNear(params);
      return result;
    },
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
    }
  );

  return { data, isLoading, error, refetch };
};

export default useGetPlacesNear;
