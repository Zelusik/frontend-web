import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import useDisplaySize from "hooks/useDisplaySize";

import TopNavigation from "components/TopNavigation";
import SearchTitle from "components/Title/SearchTitle";
import useGetMarkKeywords from "hooks/queries/mark/useGetMarkKeywords";
import Spacing from "components/Spacing";
import useGetMarkPlaces from "hooks/queries/mark/useGetMarkPlaces";
import Text from "components/Text";
import NewButton from "pages-edit/Mypage/components/NewButton";
import StoreCard from "./components/StoreCard";
import BottomNavigation from "components/BottomNavigation";
import { globalValue } from "constants/globalValue";
import { Route } from "constants/Route";
import useIntersectionObserver from "hooks/useIntersectionObserver";

export default function Mark() {
  const router = useRouter();
  const scrollRef = useRef<any>(null);
  const infinityScrollRef = useRef<any>(null);
  const { height } = useDisplaySize();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [topFixed, setTopFixed] = useState<boolean>(false);

  const { data: keywordData } = useGetMarkKeywords();
  const keywords = keywordData?.keywords && [
    {
      keyword: "전체",
      type: "",
    },
    ...keywordData?.keywords,
  ];
  const keywordList = keywords?.map(
    (keywordInfo: { keyword: string; type: string }) => keywordInfo.keyword
  );

  const {
    data: placeData,
    fetchNextPage,
    hasNextPage,
  } = useGetMarkPlaces({
    currentIndex,
    type: keywords?.[currentIndex]?.type,
    keyword: keywords?.[currentIndex]?.keyword,
  });

  useIntersectionObserver(infinityScrollRef, fetchNextPage, !!hasNextPage, {});

  function onScroll() {
    const scrollTop = 20;

    if (scrollRef.current?.scrollTop > scrollTop) {
      setTopFixed(true);
    } else {
      setTopFixed(false);
    }
  }

  useEffect(() => {
    scrollRef.current?.addEventListener("scroll", onScroll);
    return () => {
      scrollRef.current?.removeEventListener("scroll", onScroll);
    };
  }, [currentIndex]);

  return (
    <>
      <SearchTitle type="mark" />

      <Wrapper
        ref={scrollRef}
        height={height - 50 - globalValue.BOTTOM_NAVIGATION_HEIGHT}
      >
        <Spacing size={20} />
        <TopNavigation
          type="mark"
          scrollRef={scrollRef}
          scrollTop={20}
          topFixed={topFixed}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          titleList={keywordList}
          count={
            placeData?.[0].totalElements ? placeData?.[0].totalElements : 0
          }
        >
          {keywords?.map((_: any, idx: number) => {
            return (
              <TopNavigationInner key={idx} height={"auto"}>
                {placeData?.[0].totalElements !== 0 ? (
                  currentIndex === idx ? (
                    <>
                      <Spacing size={19} />
                      <StoreWrapper>
                        {placeData
                          ?.flatMap((place_data) => place_data.contents)
                          .map((place: any, placeIdx: number) => (
                            <StoreCard key={placeIdx} placeInfo={place} />
                          ))}

                        <div ref={infinityScrollRef} />
                        {hasNextPage ? <Loading>로딩중...</Loading> : null}
                      </StoreWrapper>
                      <Spacing size={20} />
                    </>
                  ) : undefined
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
              </TopNavigationInner>
            );
          })}
        </TopNavigation>
      </Wrapper>
      <BottomNavigation />
    </>
  );
}
const Wrapper = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
  overflow-y: scroll;
  background-color: #fbfbfb;
`;

const NoContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  height: calc(100vh - 227px);
  text-align: center;
`;

const TopNavigationInner = styled.div<{ height: any }>`
  height: ${({ height }) => height};
  padding: 0 20px;
  background-color: #fbfbfb;
`;

const StoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Loading = styled.div`
  width: 100%;
  height: 30px;
`;
