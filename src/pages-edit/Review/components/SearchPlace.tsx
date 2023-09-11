/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import Input from "components/Input/Input";
import BackTitle from "components/Title/BackTitle";
import { colors } from "constants/colors";
import { typography } from "constants/typography";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import { useRouter } from "next/router";
import { changeReviewInfo } from "reducer/slices/review/reviewSlice";
import useGetSearchPlace from "hooks/queries/review/useGetSearchPlace";
import { initEditImageInfo } from "reducer/slices/image/imageSlice";

const SearchPlace = () => {
  const dispatch = useAppDispatch();
  const route = useRouter();
  const image = useAppSelector((state) => state.image);
  const { placeInfo } = useAppSelector((state) => state.review);
  const infiniteScorllRef = useRef(null);
  const [value, setValue] = useState<any>("");
  const { data, hasNextPage, fetchNextPage } = useGetSearchPlace({
    x: value ? 0 : placeInfo.lng,
    y: value ? 0 : placeInfo.lat,
    keyword: value,
  });

  useIntersectionObserver(infiniteScorllRef, fetchNextPage, !!hasNextPage, {});

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
    dispatch(
      changeReviewInfo({
        type: "foodInfo",
        value: [],
      })
    );
    dispatch(
      initEditImageInfo(
        image.map((item: any) => ({
          ...item,
          menuTag: [],
        }))
      )
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
          setValue={(val: any) => setValue(val)}
        />
      </SearchInput>
      <PlaceWrapper>
        {data
          ?.flatMap((place_data) => place_data.documents)
          .map((place, index) => {
            return (
              <PlaceBox key={index} onClick={() => handleClickPlace(place)}>
                <p style={typography.Headline3}>{place.place_name}</p>
                <p style={{ ...typography.Paragraph3, color: colors.N60 }}>
                  {`${
                    place.category_name.split(">")[
                      place.category_name.split(">").length - 1
                    ]
                  }  · ${place.address_name.split(" ").slice(0, 3).join(" ")} `}
                </p>
              </PlaceBox>
            );
          })}
      </PlaceWrapper>
      <div
        ref={infiniteScorllRef}
        style={{ height: hasNextPage ? "30px" : "0px" }}
      ></div>
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
