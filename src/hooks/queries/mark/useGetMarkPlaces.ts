import React from "react";
import { getMarkPlaces } from "api/places";
import { useRouter } from "next/router";
import { useInfiniteQuery } from "react-query";
import { useQuery } from "react-query";

const useGetMarkPlaces = ({ currentIndex, type, keyword }: any) => {
  const { data, isLoading, error, refetch } = useQuery(
    [currentIndex],
    async () => {
      if (keyword !== "") {
        const params: any = {
          type: type,
          keyword: keyword,
          page: 0,
          size: 10,
        };

        const result = getMarkPlaces(params);
        return result;
      }
    }
  );

  return { data, isLoading, error, refetch };
};
// const {
//   data: responseData,
//   fetchNextPage,
//   hasNextPage,
// } = useInfiniteQuery(
//   ["markPlaces", currentIndex],
//   async ({ pageParam = 0 }) => {
//     return await getMarkPlaces({
//       type: type,
//       keyword: keyword,
//       page: pageParam,
//       size: 20,
//     });
//   },

//   {
//     getNextPageParam: (lastPage) => {
//       return lastPage.isLast ? undefined : lastPage.number + 1;
//     },
//   }
// );
// const data = responseData?.pages;
// return { data, fetchNextPage, hasNextPage };

export default useGetMarkPlaces;
