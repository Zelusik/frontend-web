import React, { useEffect, forwardRef, useRef } from "react";
import styled from "@emotion/styled";
import useGetMarkPlaces from "hooks/queries/mark/useGetMarkPlaces";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import LoadingCircle from "components/Loading/LoadingCircle";
import Spacing from "components/Spacing";
import Text from "components/Text";
import StoreCard from "./StoreCard";
import NewButton from "pages-edit/Mypage/components/NewButton";
import { useRouter } from "next/router";
import { Route } from "constants/Route";

interface Props {
  height?: any;
  children?: any;
}

const StoreContainer = forwardRef(function Div(
  { index, touch, keywords, ...props }: any,
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

  if (markLoading) return <LoadingCircle />;
  return (
    <>
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
    </>
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
