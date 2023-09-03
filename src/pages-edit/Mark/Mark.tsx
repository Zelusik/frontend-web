/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import useDisplaySize from "hooks/useDisplaySize";

import MarkTopNavigation from "components/TopNavigation/MarkTopNativation";
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
import LoadingCircle from "components/Loading/LoadingCircle";
import TopNavigationBox from "components/TopNavigation/TopNavigationBox";
import { colors } from "constants/colors";
import HorizonalScroll from "components/HorizonalScroll";

import Swiper from "components/Swiper";
import SwiperSlide from "components/Swiper/SwiperSlide";

import { Swiper as Swiper2, SwiperSlide as SwiperSlide2 } from "swiper/react";
import "swiper/css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Mark() {
  const router = useRouter();
  const scrollRef = useRef<any>(null);
  const infinityScrollRef = useRef<any>(null);
  const { width, height } = useDisplaySize();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [topFixed, setTopFixed] = useState<boolean>(false);
  const [touchMove, setTouchMove] = useState(true);

  // react-query: titleList
  const { keywordData, isLoading } = useGetMarkKeywords();
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

  // react-query: mark
  const {
    markData,
    isLoading: markIsLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetMarkPlaces({
    currentIndex,
    type: keywords?.[currentIndex]?.type,
    keyword: keywords?.[currentIndex]?.keyword,
  });
  useIntersectionObserver(infinityScrollRef, fetchNextPage, !!hasNextPage, {});

  // fixed value
  const fixedHeight = height - 70 - 35 - globalValue.BOTTOM_NAVIGATION_HEIGHT;
  // TopNavigation scroll
  function onScroll() {
    const scrollTop = 20;

    if (scrollRef.current?.scrollTop > scrollTop) setTopFixed(true);
    else setTopFixed(false);
  }
  useEffect(() => {
    scrollRef.current?.addEventListener("scroll", onScroll);
    return () => {
      scrollRef.current?.removeEventListener("scroll", onScroll);
    };
  }, [currentIndex, keywordData, markData]);

  if (isLoading) return <LoadingCircle />;
  return (
    <>
      <SearchTitle type="mark" />

      <Wrapper
        ref={scrollRef}
        height={height - 50 - globalValue.BOTTOM_NAVIGATION_HEIGHT}
      >
        <Spacing size={20} />

        <Swiper index={{ currentIndex }}>
          <SwiperSlide width={width} style={{ padding: 20 }}>
            <HorizonalScroll>
              <div style={{ height: 100 }}>
                HorizonalScroll 긴제목테스트 긴제목테스트 긴제목테스트
                긴제목테스트 긴제목테스트 긴제목테스트 긴제목테스트 긴제목테스트
              </div>
            </HorizonalScroll>
            <Swiper2 allowSlideNext={false}>
              <SwiperSlide2>
                <div style={{ height: 100 }}>Hi1</div>
              </SwiperSlide2>
              <SwiperSlide2>
                <div style={{ height: 100 }}>Hi2</div>
              </SwiperSlide2>
            </Swiper2>
          </SwiperSlide>

          <SwiperSlide width={width} style={{ padding: 20 }}>
            <HorizonalScroll>
              <div style={{ height: 100 }}>
                HorizonalScroll2
                {/* 긴제목테스트 긴제목테스트 긴제목테스트2 긴제목테스트
                긴제목테스트 긴제목테스트 긴제목테스트 긴제목테스트 */}
              </div>
            </HorizonalScroll>
          </SwiperSlide>

          <SwiperSlide width={width} style={{ padding: 20 }}>
            <HorizonalScroll>
              <div style={{ height: 100 }}>
                HorizonalScroll3
                {/* 긴제목테스트 긴제목테스트 긴제목테스트3 긴제목테스트
                긴제목테스트 긴제목테스트 긴제목테스트 긴제목테스트 */}
              </div>
            </HorizonalScroll>
          </SwiperSlide>
        </Swiper>
        {/* <MarkTopNavigation
          type="title-scroll"
          scrollRef={scrollRef}
          index={{ currentIndex, setCurrentIndex }}
          top={{ topFixed, setTopFixed }}
          scrollTop={20}
          titleList={titleList}
          count={markData?.[0]?.totalElements}
          // touch={{ touchMove }}
        >
          {titleList?.map((titleBox: any, idx: number) => {
            if (markIsLoading) return <LoadingCircle key={idx} />;
            return (
              <TopNavigationBox key={idx} height={"auto"}>
                <HorizonalScroll>
                  <div style={{ height: 50 }}>
                    긴제목테스트 긴제목테스트 긴제목테스트 긴제목테스트
                    긴제목테스트 긴제목테스트 긴제목테스트 긴제목테스트
                  </div>
                </HorizonalScroll>
                {markData?.[0].totalElements !== 0 ? (
                  currentIndex === idx ? (
                    <StoreWrapper>
                      {markData
                        ?.flatMap((place_data: any) => place_data.contents)
                        ?.map((place: any, placeIdx: number) => (
                          <StoreCard key={placeIdx} placeInfo={place} />
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
                    <LoadingCircle size={height - 243} />
                  )
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
              </TopNavigationBox>
            );
          })}
        </MarkTopNavigation> */}
      </Wrapper>
      <BottomNavigation />
    </>
  );
}
const Wrapper = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
  overflow-y: auto;
  background-color: ${colors["MarkColor"]};
`;

const NoContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  height: calc(100vh - 227px);
  text-align: center;
`;

const StoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
