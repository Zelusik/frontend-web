import React from "react";
import { useQuery } from "react-query";
import { getMenuKeywords } from "api/review/menu";

export interface GetKeyWrodsProps {
  placeCategory: string;
  menus: string[];
}

const useGetMenuKeywords = ({ placeCategory, menus }: GetKeyWrodsProps) => {
  const { data, isLoading, error, refetch } = useQuery(
    ["menu", placeCategory, menus],
    async () => {
      const result = await getMenuKeywords({
        placeCategory,
        menus,
      });
      return result;
    },
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
    }
  );
  return { data, isLoading, error, refetch };
};

export default useGetMenuKeywords;
