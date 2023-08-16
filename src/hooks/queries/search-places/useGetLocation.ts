import { useQuery } from "react-query";
import { useGetPlacesNear } from "api/places";

const useGetLocation = (keyword: any): any => {
  const { data, isLoading, error, refetch } = useQuery(
    [],
    async () => {
      const params: any = {
        params: {
          keyword: keyword && keyword,
          page: 0,
        },
      };
      const result = await useGetPlacesNear(params);
      return result;
    },
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
    }
  );

  return { data, isLoading, error, refetch };
};

export default useGetLocation;
