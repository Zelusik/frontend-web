import React from "react";
import { getMarkPlaces } from "api/mark";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

const useGetMarkPlaces = () => {
  const { query } = useRouter();
  const type = Array.isArray(query.type) ? query.type[0] : query.type || "";
  const keyword = Array.isArray(query.keyword)
    ? query.keyword[0]
    : query.keyword || "";

  const { data, isLoading, error } = useQuery(
    ["markPlaces", query],
    async () =>
      await getMarkPlaces({
        type: type,
        keyword: keyword,
        page: 0,
        size: 20,
      })
  );
  return { data, isLoading, error };
};

export default useGetMarkPlaces;
