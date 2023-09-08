/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import useDisplaySize from "hooks/useDisplaySize";

import TopNavigation from "components/TopNavigation";
import SearchTitle from "components/Title/SearchTitle";
import useGetMarkKeywords from "hooks/queries/mark/useGetMarkKeywords";
import Spacing from "components/Spacing";
import useGetMarkPlaces from "hooks/queries/mark/useGetMarkPlaces";

import BottomNavigation from "components/BottomNavigation";
import { globalValue } from "constants/globalValue";
import { Route } from "constants/Route";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import LoadingCircle from "components/Loading/LoadingCircle";
import StoreContainer from "./components/StoreContainer";
import MarkTopNavigation from "components/TopNavigation/MarkTopNavigation";

export default function Mark() {
  const router = useRouter();
  const scrollRef = useRef<any>(null);
  const infinityScrollRef = useRef<any>(null);
  const { height } = useDisplaySize();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [topFixed, setTopFixed] = useState<boolean>(false);

  const { data: keywordData, isLoading } = useGetMarkKeywords();
  const keywords = keywordData?.keywords && [
    {
      keyword: "전체",
      type: "",
    },
    ...keywordData?.keywords,
  ];
  const titleList = keywords?.map(
    (keywordInfo: { keyword: string; type: string }) => keywordInfo?.keyword
  );

  const { markData, fetchNextPage, hasNextPage } = useGetMarkPlaces({
    index: { idx: currentIndex, currentIndex },
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
  }, [currentIndex, keywordData]);

  if (isLoading) return <LoadingCircle />;
  return (
    <>
      <SearchTitle type="mark" />

      <Wrapper
        ref={scrollRef}
        height={height - 50 - globalValue.BOTTOM_NAVIGATION_HEIGHT}
      >
        <Spacing size={20} />
        <MarkTopNavigation
          type="title-scroll"
          scrollRef={scrollRef}
          index={{ currentIndex, setCurrentIndex }}
          top={{ topFixed, setTopFixed }}
          scrollTop={20}
          titleList={titleList}
          count={markData?.[0]?.totalElements}
        >
          {titleList?.map((_: any, idx: number) => {
            // if (markIsLoading) return <LoadingCircle key={idx} />;
            return (
              <TopNavigationInner key={idx} height={"auto"}>
                <StoreContainer
                  infinityScrollRef={infinityScrollRef}
                  index={{ idx, currentIndex }}
                  keywords={keywords}
                />
              </TopNavigationInner>
            );
          })}
        </MarkTopNavigation>
        {/* <TopNavigation
          type="mark"
          scrollRef={scrollRef}
          scrollTop={20}
          topFixed={topFixed}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          titleList={titleList}
          // count={
          //   placeData?.[0].totalElements ? placeData?.[0].totalElements : 0
          // }
        >
          {titleList?.map((_: any, idx: number) => {
            return (
              <TopNavigationInner key={idx} height={"auto"}>
                <StoreContainer
                  infinityScrollRef={infinityScrollRef}
                  index={{ idx, currentIndex }}
                  keywords={keywords}
                />
              </TopNavigationInner>
            );
          })}
        </TopNavigation> */}
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

const TopNavigationInner = styled.div<{ height: any }>`
  height: ${({ height }) => height};
  background-color: #fbfbfb;
`;
