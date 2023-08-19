// 장소 선택 후 넘어갈 때 만약 장소 조회 후 없다면 저장
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import { useQuery } from "react-query";
import { changeReviewInfo } from "reducer/slices/review/reviewSlice";
import { getPlaces, postPlaces } from "api/places";

const useGetPlace = (isEnabled: boolean) => {
  const dispatch = useAppDispatch();
  const { placeInfo } = useAppSelector((state) => state.review);
  const {
    placeInfo: { kakaoPid },
  } = useAppSelector((state) => state.review);

  const { data, isLoading, error, refetch } = useQuery(
    ["place", kakaoPid],
    async () => {
      const result = await getPlaces(kakaoPid);
      if (result.status === 404 && result.data.code === 3001) {
        // 장소를 찾을 수 없으므로 장소 등록
        const postPlaceRes = await postPlaces(placeInfo);
        if (postPlaceRes.status === 404) {
        } else {
          dispatch(
            changeReviewInfo({
              type: "placeId",
              value: postPlaceRes.id,
            })
          );
        }
      } else {
        dispatch(
          changeReviewInfo({
            type: "placeId",
            value: result.id,
          })
        );
      }
      return result;
    },
    {
      enabled: isEnabled,
    }
  );
  return { data, isLoading, error, refetch };
};

export default useGetPlace;
