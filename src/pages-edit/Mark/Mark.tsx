/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import BottomNavigation from "components/BottomNavigation";
import styled from "@emotion/styled";
import SortingHeader from "./components/SortingHeader";
import FoodComponents from "./components/FoodComponents";
import useGetMarkPlaces from "hooks/queries/mark/useGetMarkPlaces";
import SearchTitle from "components/Title/SearchTitle";
import TopNavigation from "components/TopNavigation/TopNavigation";
import { useEffect, useRef, useState } from "react";
import useGetMarkKeywords from "hooks/queries/mark/useGetMarkKeywords";
import Spacing from "components/Spacing/Spacing";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import NewButton from "pages-edit/Mypage/components/NewButton";
import Text from "components/Text/Text";
import { Route } from "constants/Route";
import useDisplaySize from "hooks/useDisplaySize";
import { globalValue } from "constants/globalValue";

export default function Mark() {
  const router = useRouter();
  const { height } = useDisplaySize();
  const { data: placeData, fetchNextPage, hasNextPage } = useGetMarkPlaces();
  const { data: keywordData } = useGetMarkKeywords();

  const keywords = keywordData && [
    {
      keyword: "전체",
      type: "",
    },
    ...keywordData.keywords,
  ];

  const keywordList =
    keywords &&
    keywords.map(
      (keywordInfo: { keyword: string; type: string }) => keywordInfo.keyword
    );

  const infiniteScrollRef = useRef<any>(null);
  const scrollRef = useRef<any>(null);
  const [topFixed, setTopFixed] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useIntersectionObserver(infiniteScrollRef, fetchNextPage, !!hasNextPage, {});

  function onScroll() {
    const scrollTop = 50 + 20 + 35;

    if (currentIndex === 0 && scrollRef.current?.scrollTop >= scrollTop) {
      scrollRef.current!.scrollTop = scrollTop;
      return;
    }

    if (scrollRef.current?.scrollTop > scrollTop - 30) {
      setTopFixed(true);
    } else {
      setTopFixed(false);
    }
  }

  useEffect(() => {
    if (keywords) {
      const keywordInfo = keywords[currentIndex];
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          type: keywordInfo.type,
          keyword: keywordInfo.keyword,
        },
      });
    }

    scrollRef.current?.addEventListener("scroll", onScroll);
    return () => {
      scrollRef.current?.removeEventListener("scroll", onScroll);
    };
  }, [currentIndex]);

  return (
    <>
      {placeData && (
        <>
          <SearchTitle type="mark" />
          <MarkWrapper height={height - 50 - globalValue.BOTTOM_NAVIGATION_HEIGHT}>
            <Spacing size={20} />
            <TopNavigation
              type="mark"
              scrollRef={scrollRef}
              scrollTop={70}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              topFixed={topFixed}
              titleList={keywordList}
            >
              {keywords &&
                keywordList &&
                keywordList.map((keyword: string) => (
                  <TopNavigationInner key={keyword}>
                    <SortingHeader count={placeData?.[0].totalElements} />
                    {placeData && placeData?.length > 0 ? (
                      <div className="place-box">
                        {placeData.map((place) =>
                          place.contents.map((placeInfo: any) => (
                            <FoodComponents
                              key={placeInfo.id}
                              placeInfo={placeInfo}
                            />
                          ))
                        )}
                        <div ref={infiniteScrollRef} style={{ height: "30px" }} />
                      </div>
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
                ))}
            </TopNavigation>
          </MarkWrapper>
          <BottomNavigation />
        </>
      )}
    </>
  );
}

const MarkWrapper = styled.div<{ height: number }>`
  height: ${({ height }) => height + "px"};
  overflow-y: auto;
  background-color: #fbfbfb;
  overflow-y: scroll;
  .place-box {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 0 15px;
    height: 100%;
  }
`;

const NoContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  height: calc(100vh - 247px);
  text-align: center;
`;

const TopNavigationInner = styled.div`
  height: 100%;
`;
