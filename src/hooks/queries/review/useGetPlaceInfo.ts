import React from "react";

import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import { useQuery } from "react-query";
import { changeReviewInfo } from "reducer/slices/review/reviewSlice";
import { kakaoSearchKeyword } from "api/open-api";

// 리뷰 작성 시 처음에 장소 위치 알아오기 위해 사용
const useGetPlaceInfo = (image: any) => {
  const dispatch = useAppDispatch();
  const { placeInfo } = useAppSelector((state) => state.review);

  const getCurrentPosition = (options: any): Promise<GeolocationPosition> =>
    new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject, options)
    );

  const getKakaoData = async (lng: number | undefined, lat: number | undefined) => {
    if ("geolocation" in navigator) {
      const position: GeolocationPosition = await getCurrentPosition({
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity,
      });

      const res: any = await kakaoSearchKeyword({
        x: lng || position.coords.longitude,
        y: lat || position.coords.latitude,
        keyword: "",
        page: 1,
      });
      dispatch(
        changeReviewInfo({
          type: "placeInfo",
          value: {
            kakaoPid: res.documents[0].id,
            name: res.documents[0].place_name,
            pageUrl: res.documents[0].place_url,
            categoryName: res.documents[0].category_name,
            categoryGroupCode: res.documents[0].category_group_code,
            phone: res.documents[0].phone,
            lotNumberAddress: res.documents[0].address_name,
            roadAddress: res.documents[0].raod_address_name,
            lat: res.documents[0].y,
            lng: res.documents[0].x,
          },
        })
      );
    }
    return null;
  };

  const { data, isLoading, error } = useQuery(
    ["kakaoData", image[0]?.lng, image[0]?.lat],
    async () => {
      await getKakaoData(image[0]?.lng, image[0]?.lat);
    },
    {
      retry: false,
      enabled: !placeInfo.kakaoPid && image.length > 0,
    }
  );
  return { data, isLoading, error };
};

export default useGetPlaceInfo;
