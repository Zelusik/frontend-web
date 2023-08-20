import React from "react";
import { getMarkKeywords } from "api/places";
import { useQuery } from "react-query";

const useGetMarkKeywords = () => {
  const { data, isLoading, error } = useQuery(
    ["markKeywords"],
    async () => await getMarkKeywords(),
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
    }
  );
  return { data, isLoading, error };
};

export default useGetMarkKeywords;
