// 장소 선택 후 넘어갈 때 만약 장소 조회 후 없다면 저장
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { useQuery } from "react-query";
import { changeReviewInfo } from "@/reducer/slices/review/reviewSlice";
import { existencePlace, getPlaces, postPlaces } from "@/api/places";

const useGetPlace = (isEnabled: boolean) => {
  const dispatch = useAppDispatch();
  const { placeInfo } = useAppSelector((state) => state.review);
  const {
    placeInfo: { kakaoPid },
  } = useAppSelector((state) => state.review);

  const { data, isLoading, error, refetch } = useQuery(
    ["place", kakaoPid],
    async () => {
      const isExistPlace = await existencePlace(kakaoPid);
      if (isExistPlace.existenceOfPlace) {
        const result = await getPlaces(kakaoPid);
        dispatch(
          changeReviewInfo({
            type: "placeId",
            value: result.id,
          })
        );
        return result;
      } else {
        const postPlaceRes = await postPlaces(placeInfo);
        dispatch(
          changeReviewInfo({
            type: "placeId",
            value: postPlaceRes.id,
          })
        );
        return postPlaceRes;
      }
    },
    {
      enabled: isEnabled,
    }
  );
  return { data, isLoading, error, refetch };
};

export default useGetPlace;
