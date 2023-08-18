import { useQuery } from "react-query";
import { getMeetingPlaces } from "api/meeting-places";
import { getMembersSearch } from "api/members";
import { getKeyword } from "api/open-api";

const useGetSearch = (currentIndex: number, keyword: any): any => {
  const { data, isLoading, error, refetch } = useQuery(
    [keyword],
    async () => {
      if (keyword !== "") {
        const params: any =
          currentIndex === 1
            ? {
                category_group_code: "FD6,CE7",
                query: keyword,
                page: 1,
                size: 10,
              }
            : {
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
            ? getKeyword(params)
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
