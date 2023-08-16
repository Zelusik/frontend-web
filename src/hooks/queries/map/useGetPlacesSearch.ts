import { useQuery } from "react-query";
import { useAppSelector } from "hooks/useReduxHooks";
import { getPlacesSearch } from "api/places";

const useGetPlacesSearch = (): any => {
  const { type, foodType, dayOfWeek, mood, location } = useAppSelector(
    (state) => state.search
  );

  const { data, isLoading, error, refetch } = useQuery(
    ["search", type, foodType, dayOfWeek, mood, location],
    async () => {
      const params: any = {
        params: {
          daysOfWeek: dayOfWeek.length !== 0 ? dayOfWeek : undefined,
          keyword: mood && mood,
          lat: location.lat,
          lng: location.lng,
          page: 0,
          size: 10,
        },
      };
      const result = await getPlacesSearch(params);
      return result;
    },
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
    }
  );

  return { data, isLoading, error, refetch };
};

export default useGetPlacesSearch;
