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

export default function Mark() {
  const router = useRouter();
  const { data: placeData } = useGetMarkPlaces();
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

  const scrollRef = useRef<any>(null);
  const [topFixed, setTopFixed] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

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
          <MarkWrapper ref={scrollRef}>
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
                keywordList.map((keyword: string) => (
                  <TopNavigationInner key={keyword}>
                    <SortingHeader count={placeData.numOfElements} />
                    <div className="place-box">
                      {placeData.contents.map((placeInfo: any) => (
                        <FoodComponents key={placeInfo.id} placeInfo={placeInfo} />
                      ))}
                    </div>{" "}
                    *
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

const MarkWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  background-color: #fbfbfb;
  .place-box {
    display: flex;
    flex-direction: column;
    gap: 24px;
    height: 100%;
    overflow-y: auto;
    padding: 0 15px;
  }
`;

const TopNavigationInner = styled.div``;
