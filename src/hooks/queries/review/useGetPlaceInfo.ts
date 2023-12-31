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

  const dispatchPlaceInfo = (res: any) => {
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
  };

  const getKakaoData = async (lng: any, lat: any) => {
    try {
      if ("geolocation" in navigator) {
        const position: GeolocationPosition = await getCurrentPosition({
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        });
        if (lng !== "" && lat !== "") {
          const res: any = await kakaoSearchKeyword({
            x: lng,
            y: lat,
            keyword: "",
            page: 1,
          });
          dispatchPlaceInfo(res);
        } else {
          const res: any = await kakaoSearchKeyword({
            x: position.coords.longitude,
            y: position.coords.latitude,
            keyword: "",
            page: 1,
          });
          dispatchPlaceInfo(res);
        }
      }
    } catch (error) {
      const res: any = await kakaoSearchKeyword({
        x: 126.951592,
        y: 37.544018,
        keyword: "",
        page: 1,
      });
      dispatchPlaceInfo(res);
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
