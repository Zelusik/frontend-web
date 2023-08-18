import { useQuery } from "react-query";
import { getMeetingPlaces } from "api/meeting-places";
import { getPlacesSearch } from "api/places";
import { getMembersSearch } from "api/members";

const useGetSearch = (currentIndex: number, keyword: any): any => {
  const { data, isLoading, error, refetch } = useQuery(
    [currentIndex, keyword],
    async () => {
      if (keyword !== "") {
        const params: any = {
          params: {
            keyword: keyword,
            page: 0,
            size: 10,
          },
        };
        const result =
          currentIndex === 0
            ? await getMeetingPlaces(params)
            : currentIndex === 1
            ? getPlacesSearch(params)
            : getMembersSearch(params);
        return result;
      }
    },
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
    }
  );

  return { data, isLoading, error, refetch };
};

export default useGetSearch;
