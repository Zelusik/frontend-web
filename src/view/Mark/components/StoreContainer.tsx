import React, { useEffect, forwardRef, useRef } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import useGetMarkPlaces from "hooks/queries/mark/useGetMarkPlaces";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import LoadingCircle from "components/Loading/LoadingCircle";
import Spacing from "components/Spacing";
import Text from "components/Text";
import StoreCard from "./StoreCard";
import NewButton from "view/Mypage/components/NewButton";
import { useRouter } from "next/router";
import { Route } from "constants/Route";
import useDisplaySize from "hooks/useDisplaySize";
import { globalValue } from "constants/globalValue";
import SortingHeader from "./SortingHeader";

interface Props {
  height?: any;
  children?: any;
}

const StoreContainer = forwardRef(function Div(
  { height, index, touch, keywords, ...props }: any,
  ref: any
) {
  const router = useRouter();
  const infinityScrollRef = useRef<any>(null);
  //   react-query: mark
  const { markData, markLoading, fetchNextPage, hasNextPage } =
    useGetMarkPlaces({
      index,
      type: keywords?.[index.idx]?.type,
      keyword: keywords?.[index.idx]?.keyword,
    });
  useIntersectionObserver(infinityScrollRef, fetchNextPage, !!hasNextPage, {});

  if (markLoading)
    return (
      <LoadingCircle
        size={height - 156 - globalValue.BOTTOM_NAVIGATION_HEIGHT}
      />
    );
  return (
    <div style={{ height: height, overflowY: "auto", padding: "0 15px" }}>
      <SortingHeader count={markLoading ? 0 : markData?.[0]?.totalElements} />
      <Spacing size={19} />
      {markData?.[0].totalElements !== 0 ? (
        <StoreWrapper>
          {markData
            ?.flatMap((place_data: any) => place_data.contents)
            ?.map((place: any, placeIdx: number) => (
              <StoreCard key={placeIdx} placeInfo={place} touch={touch} />
            ))}

          <div ref={infinityScrollRef} />
          {hasNextPage ? (
            <>
              <LoadingCircle size={30} />
              <Spacing size={20} />
            </>
          ) : null}
        </StoreWrapper>
      ) : (
        <NoContent>
          <Text typo="Paragraph5" color="N80">
            아직 저장된 음식점이 없습니다
          </Text>
          <NewButton
            buttonText="음식점 리뷰 둘러보기"
            onClick={() => router.push(Route.HOME())}
          />
        </NoContent>
      )}
    </div>
  );
});

const StoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const NoContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  height: calc(100vh - 227px);
  text-align: center;
`;

export default StoreContainer;
