/* eslint-disable react-hooks/exhaustive-deps */
import styled from "@emotion/styled";
import { kakaoSearchKeyword } from "api/review";
import Input from "components/Input/Input";
import BackTitle from "components/Title/BackTitle";
import { colors } from "constants/colors";
import { typography } from "constants/typography";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { changeReviewInfo } from "reducer/slices/review/reviewSlice";

const SearchPlace = () => {
  const dispatch = useAppDispatch();
  const route = useRouter();
  const { placeInfo } = useAppSelector((state) => state.review);
  const infiniteScorllRef = useRef(null);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchPlaceData, setSearchPlaceData] = useState<any>({
    res: [],
    page: 1,
    isLast: false,
  });

  const loadMore = () => {
    if (isLoading || searchPlaceData.isLast) {
      return;
    }
    setIsLoading(true);

    fetchData(searchPlaceData.page + 1, () => {
      setIsLoading(false);
    });

    setSearchPlaceData((prev: any) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const fetchData = (page: number, callback: () => void) => {
    kakaoSearchKeyword(
      value ? 0 : placeInfo.lng,
      value ? 0 : placeInfo.lat,
      value,
      page,
      (res: any) => {
        setSearchPlaceData((prev: any) => ({
          ...prev,
          res: [...prev.res, ...res.documents],
          isLast: res.meta.is_end, // API 응답에 따라 is_end를 확인
        }));
        callback();
      }
    );
  };

  useIntersectionObserver(infiniteScorllRef, loadMore, !searchPlaceData.isLast, {});

  useEffect(() => {
    setSearchPlaceData({
      res: [],
      page: 1,
      isLast: false,
    });
  }, [value]);

  useEffect(() => {
    fetchData(searchPlaceData.page, () => {});
  }, [value]);

  const handleClickPlace = (place: any) => {
    dispatch(
      changeReviewInfo({
        type: "placeInfo",
        value: {
          kakaoPid: place.id,
          name: place.place_name,
          pageUrl: place.place_url,
          categoryName: place.category_name,
          categoryGroupCode: place.category_group_code,
          phone: place.phone,
          lotNumberAddress: place.address_name,
          roadAddress: place.raod_address_name,
          lat: place.y,
          lng: place.x,
        },
      })
    );
    route.back();
  };

  return (
    <SearchPlaceWrapper>
      <BackTitle type="black-left-text" />
      <SearchInput>
        <Input
          type="line"
          placeholder="리뷰를 쓸 음식점을 검색해보세요."
          value={value}
          setValue={setValue}
        />
      </SearchInput>
      <PlaceWrapper>
        {searchPlaceData.res.map((data: any, index: number) => {
          return (
            <PlaceBox
              key={index}
              ref={
                index === searchPlaceData.res.length - 1 ? infiniteScorllRef : null
              }
              onClick={() => handleClickPlace(data)}
            >
              <p style={typography.Headline3}>{data.place_name}</p>
              <p style={{ ...typography.Paragraph3, color: colors.N60 }}>
                {`${
                  data.category_name.split(">")[
                    data.category_name.split(">").length - 1
                  ]
                }  · ${data.address_name.split(" ").slice(0, 3).join(" ")} `}
              </p>
            </PlaceBox>
          );
        })}
      </PlaceWrapper>
    </SearchPlaceWrapper>
  );
};

const SearchPlaceWrapper = styled.div`
  padding: 0 20px;
  height: 100vh;
  overflow-y: scroll;
`;
const SearchInput = styled.div``;
const PlaceWrapper = styled.div`
  padding: 26px 0;
  display: flex;
  flex-direction: column;
  gap: 26px;
`;
const PlaceBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  p {
    margin: 0;
  }
`;

export default SearchPlace;