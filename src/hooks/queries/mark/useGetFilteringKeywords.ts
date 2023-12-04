import React from "react";
import { placesApi } from "api/places";
import { useQuery } from "react-query";

const useGetFilteringKeywords = () => {
  const { data, isLoading, error } = useQuery(
    ["markKeywords"],
    async () => await placesApi.getFilteringKeywords(),
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
    }
  );
  return { keywordDatas: data, isLoadingKeyword: isLoading, error };
};

export default useGetFilteringKeywords;
