import React from "react";
import { getMarkPlaces } from "api/places";
import { useInfiniteQuery } from "react-query";

const useGetMarkPlaces = ({ currentIndex, type, keyword }: any) => {
  const fetchMarkPlaces = async ({ pageParam = 0 }) => {
    if (keyword !== "") {
      const params: any = {
        type: type,
        keyword: keyword,
        page: pageParam,
        size: 20,
      };
      return getMarkPlaces(params);
    }
  };

  const {
    data: responseData,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery([currentIndex, type, keyword], fetchMarkPlaces, {
    getNextPageParam: (lastPage) => {
      return lastPage.isLast ? undefined : lastPage.number + 1;
    },
  });
  const data = responseData?.pages;
  return { data, isLoading, error, fetchNextPage, hasNextPage, refetch };
};

export default useGetMarkPlaces;
