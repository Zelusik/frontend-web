import React from "react";
import { useAppSelector } from "hooks/useReduxHooks";
import { useQuery } from "react-query";
import { getMenus, postMenu } from "api/places-menus";

type UseGetMenusResult = {
  data: any;
  isLoading: boolean;
  error: any;
  refetch: () => void;
};

const useGetMenus = (isEnabled?: boolean): UseGetMenusResult => {
  const { placeId } = useAppSelector((state) => state.review);

  const { data, isLoading, error, refetch } = useQuery(
    ["menu", placeId],
    async () => {
      const result = await getMenus(placeId);
      if (result.status) {
        if (result.status === 404 && result.data.code === 3004) {
          // 메뉴 조회 시 에러 발생하면 메뉴 데이터 없는 것이므로 메뉴 생성
          const postMenuRes = await postMenu(placeId);
          if (postMenuRes.status) {
          } else {
            return postMenuRes;
          }
        }
      } else {
        return result;
      }
    },
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      enabled: isEnabled,
    }
  );

  return { data, isLoading, error, refetch };
};

export default useGetMenus;
