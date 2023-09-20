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
import StoreContainer from "./components/StoreContainer";
import MarkTopNavigation from "components/TopNavigation/MarkTopNavigation";
import LoadingCircle from "components/Loading/LoadingCircle";
import ExampleCustomSlider from "components/CustomSlider/WrapperSlider";
import { colors } from "constants/colors";

export default function Mark() {
  const scrollRef = useRef<any>(null);
  const infinityScrollRef = useRef<any>(null);
  const { height } = useDisplaySize();

  const [topFixed, setTopFixed] = useState<boolean>(false);
  const [wrapperIndex, setWrapperIndex] = useState(0);
  const [touch, setTouch] = useState(true);

  const { keywordData, keywordLoading } = useGetMarkKeywords();
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

  const { markData, markLoading, fetchNextPage, hasNextPage } =
    useGetMarkPlaces({
      type: keywords?.[wrapperIndex]?.type,
      keyword: keywords?.[wrapperIndex]?.keyword,
    });

  useIntersectionObserver(infinityScrollRef, fetchNextPage, !!hasNextPage, {});

  // function onScroll() {
  //   const scrollTop = 20;

  //   if (scrollRef.current?.scrollTop > scrollTop) {
  //     setTopFixed(true);
  //   } else {
  //     setTopFixed(false);
  //   }
  // }

  // useEffect(() => {
  //   scrollRef.current?.addEventListener("scroll", onScroll);
  //   return () => {
  //     scrollRef.current?.removeEventListener("scroll", onScroll);
  //   };
  // }, [wrapperIndex, keywordData]);

  return (
    <>
      <SearchTitle type="mark" />
      <div
        style={{
          background: colors["MarkColor"],
        }}
      >
        {keywordLoading ? (
          <LoadingCircle
            size={height - 50 - globalValue.BOTTOM_NAVIGATION_HEIGHT}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Spacing size={20} />
            <MarkTopNavigation
              type="title-scroll"
              scrollRef={scrollRef}
              top={{ topFixed, setTopFixed }}
              index={{ wrapperIndex, setWrapperIndex }}
              touch={{ touch, setTouch }}
              scrollTop={20}
              titleList={titleList}
              count={markLoading ? 0 : markData?.[0]?.totalElements}
            >
              {titleList?.map((_: any, idx: number) => {
                // if (idx !== currentIndex) return null;
                return (
                  <TopNavigationInner
                    key={idx}
                    height={height - 105 - globalValue.BOTTOM_NAVIGATION_HEIGHT}
                  >
                    <StoreContainer
                      infinityScrollRef={infinityScrollRef}
                      height={
                        height - 105 - globalValue.BOTTOM_NAVIGATION_HEIGHT
                      }
                      index={{ idx }}
                      touch={{ touch, setTouch }}
                      keywords={keywords}
                    />
                  </TopNavigationInner>
                );
              })}
            </MarkTopNavigation>
          </motion.div>
        )}
      </div>
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
