import React from "react";
import { getMenus } from "api/review";
import { useAppSelector } from "hooks/useReduxHooks";
import { useQuery } from "react-query";
import { getCookie } from "utils/cookie";

type UseGetMenusResult = {
  data: string[] | undefined;
  isLoading: boolean;
  error: any;
  refetch: () => void;
};

const useGetMenus = (): UseGetMenusResult => {
  const {
    placeInfo: { kakaoPid },
  } = useAppSelector((state) => state.review);

  const accessToken: any = getCookie("accessToken");

  const { data, isLoading, error, refetch } = useQuery(
    ["menu", kakaoPid],
    () => getMenus(kakaoPid, accessToken),
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
    }
  );
  return { data, isLoading, error, refetch };
};

export default useGetMenus;
