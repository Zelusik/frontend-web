import { useQuery } from "react-query";
import { useAppSelector } from "hooks/useReduxHooks";
import { getCoordToAddress } from "api/open-api";

const useGetCoordToAddress = (): any => {
  const { location } = useAppSelector((state) => state.search);

  const { data, isLoading, error, refetch } = useQuery(
    [location],
    async () => {
      const params: any = {
        x: location.lng,
        y: location.lat,
        input_coord: "WGS84",
      };
      const result = await getCoordToAddress(params);
      return result;
    },
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
    }
  );

  return { data, isLoading, error, refetch };
};

export default useGetCoordToAddress;
