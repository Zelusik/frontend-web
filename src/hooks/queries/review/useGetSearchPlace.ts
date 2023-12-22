import React from "react";
import { kakaoSearchKeyword } from "@/api/open-api";
import { useInfiniteQuery } from "react-query";

const useGetSearchPlace = ({ x, y, keyword }: any) => {
  const {
    data: responseData,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["searchPlace", x, y, keyword],
    async ({ pageParam = 1 }) => {
      return await kakaoSearchKeyword({
        x: x,
        y: y,
        keyword: keyword,
        page: pageParam,
      });
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.meta?.is_end ? undefined : allPages?.length + 1;
      },
    }
  );
  const data = responseData?.pages;
  return { data, fetchNextPage, hasNextPage };
};

export default useGetSearchPlace;
