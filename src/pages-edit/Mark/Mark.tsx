/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import useDisplaySize from "hooks/useDisplaySize";

import SearchTitle from "components/Title/SearchTitle";
import useGetMarkKeywords from "hooks/queries/mark/useGetMarkKeywords";
import Spacing from "components/Spacing";
import useGetMarkPlaces from "hooks/queries/mark/useGetMarkPlaces";

import BottomNavigation from "components/BottomNavigation";
import { globalValue } from "constants/globalValue";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import LoadingCircle from "components/Loading/LoadingCircle";
import StoreContainer from "./components/StoreContainer";
import MarkTopNavigation from "components/TopNavigation/MarkTopNavigation";

export default function Mark() {
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

  const [touch, setTouch] = useState(false);

  return (
    <>
      {isLoading ? (
        <LoadingCircle />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
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
              touch={{ touch, setTouch }}
              top={{ topFixed, setTopFixed }}
              scrollTop={20}
              titleList={titleList}
              count={markData?.[0]?.totalElements}
            >
              {titleList?.map((_: any, idx: number) => {
                return (
                  <TopNavigationInner key={idx} height={"auto"}>
                    <StoreContainer
                      infinityScrollRef={infinityScrollRef}
                      index={{ idx, currentIndex }}
                      touch={{ touch, setTouch }}
                      keywords={keywords}
                    />
                  </TopNavigationInner>
                );
              })}
            </MarkTopNavigation>
          </Wrapper>
        </motion.div>
      )}
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
