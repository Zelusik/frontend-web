/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import useDisplaySize from "hooks/useDisplaySize";

import Hashtags from "components/Hashtags";
import TopNavigation from "components/TopNavigation";
import Info from "components/Common/Info";

import { colors } from "constants/colors";
import BackTitle from "components/Title/BackTitle";
import StoreTitle from "components/Title/StoreTitle";

import ReviewCard from "./components/ReviewCard";
import ImageBox from "./components/ImageBox";
import { globalValue } from "constants/globalValue";
import useGetStore from "hooks/queries/store-detail/useGetStore";
import { makeInfo } from "utils/makeInfo";
import LoadingCircle from "components/Loading/LoadingCircle";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import { Space } from "components/core";

export default function StoreDetail() {
  const router = useRouter();
  const scrollRef = useRef<any>(null);
  const infinityScrollRef = useRef<any>(null);

  const imageRef = useRef<any>(null);
  const { width, height } = useDisplaySize();

  const [titleChange, setTitleChange] = useState<boolean>(false);
  const [topFixed, setTopFixed] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const {
    isStoreInfoLoading,
    storeInfoData: storeInfo,
    reviewsData: reviews,
    fetchNextPage,
    hasNextPage,
  } = useGetStore({
    kakaoId: router.query.kakaoId,
    placeId: Number(router.query.id),
  });

  useIntersectionObserver(infinityScrollRef, fetchNextPage, !!hasNextPage, {});

  function onScroll() {
    const scrollTop = (window.innerWidth * 281) / 360 + 20 + 49 + 16 + 40 - 10;

    if (
      storeInfo?.placeImages?.length === 0 &&
      scrollRef.current?.scrollTop >= 165 &&
      currentIndex === 1
    ) {
      scrollRef.current!.scrollTop = 165;
    } else if (
      scrollRef.current?.scrollTop >= scrollTop &&
      currentIndex === 1
    ) {
      scrollRef.current!.scrollTop = scrollTop;
      return;
    }

    if (
      storeInfo?.placeImages?.length === 0 &&
      scrollRef.current?.scrollTop >= 25
    ) {
      setTitleChange(true);
    } else if (
      scrollRef.current?.scrollTop >=
      imageRef.current?.clientHeight - 20
    ) {
      setTitleChange(true);
    } else {
      setTitleChange(false);
    }

    if (
      storeInfo?.placeImages?.length === 0 &&
      scrollRef.current?.scrollTop >= 165
    ) {
      setTopFixed(true);
    } else if (scrollRef.current?.scrollTop >= scrollTop - 1) {
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
  }, [currentIndex, storeInfo]);

  if (isStoreInfoLoading) return <LoadingCircle />;

  return (
    <>
      <ImageBox ref={imageRef} images={storeInfo?.placeImages} />
      <TitleWrapper visible={titleChange}>
        <BackTitle
          type={
            titleChange
              ? "black-left-text"
              : storeInfo?.placeImages?.length > 0
              ? "white-dots-store"
              : "black-left-text"
          }
          title={titleChange ? storeInfo?.name : undefined}
        />
      </TitleWrapper>

      <Wrapper ref={scrollRef} height={height}>
        <Space
          h={storeInfo?.placeImages?.length > 0 ? (width * 281) / 360 : 50}
        />

        <Inner>
          <Space h={20} />
          <StoreTitle
            type="detail"
            title={storeInfo?.name}
            subTitle={
              storeInfo &&
              `${storeInfo?.category} · ${storeInfo?.address?.sido} ${storeInfo?.address?.sgg} ${storeInfo?.address?.lotNumberAddress}`
            }
            isMarked={storeInfo?.isMarked}
            placeId={storeInfo?.id}
            point={storeInfo?.point}
          />

          <Space h={16} />
          <Hashtags hashtagTextDatas={storeInfo?.top3Keywords} />
          <Space h={40} />

          <TopNavigation
            type="store-detail"
            scrollRef={scrollRef}
            scrollTop={
              storeInfo?.placeImages?.length === 0
                ? 165
                : (width * 281) / 360 + 20 + 49 + 16 + 40
            }
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            topFixed={topFixed}
            titleList={["리뷰", "매장정보"]}
          >
            <div
              style={{
                height:
                  currentIndex === 0
                    ? "auto"
                    : height - globalValue.BOTTOM_NAVIGATION_HEIGHT - 29.8,
              }}
            >
              {reviews
                ?.flatMap((page_data: any) => page_data.contents)
                ?.map((review: any, idx: number) => {
                  return <ReviewCard key={idx} data={review} />;
                })}
              <div ref={infinityScrollRef} />
              {hasNextPage ? (
                <>
                  <LoadingCircle height={30} />
                  <Space h={30} />
                </>
              ) : null}
            </div>
            <StoreInfo
              height={
                height - globalValue.BOTTOM_NAVIGATION_HEIGHT - 29.8 + "px"
              }
            >
              {makeInfo(storeInfo && storeInfo).map(
                (data: any, idx: number) => {
                  return <Info key={idx} data={data} />;
                }
              )}
            </StoreInfo>
          </TopNavigation>
        </Inner>
      </Wrapper>
    </>
  );
}

const fade = (visible: boolean) => keyframes`
  from {
    opacity: ${visible && 0};
    background-color: ${visible ? `transparent` : `${colors.N0}`};
  }
  to {
    opacity: ${visible && 1};
    background-color: ${visible ? `${colors.N0}` : `transparent`};
  }
`;

const Wrapper = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
  overflow-y: scroll;
  background-color: ${colors.N0};
`;

const Inner = styled.div`
  position: relative;
  background-color: ${colors.N0};
`;

const TitleWrapper = styled.div<{ visible: boolean }>`
  width: 100%;
  padding: 0 20px;

  position: fixed;
  top: 0;
  z-index: 900;

  background-color: ${({ visible }) =>
    visible ? `${colors.N0}` : `transparents`};
  animation: ${(props) => fade(props.visible)} 0.3s forwards;
`;

const StoreInfo = styled.div<{ height: any }>`
  height: ${({ height }) => height};
  padding: 0 20px;
`;

const Dot = styled.div`
  width: 2px;
  height: 2px;
  margin: 0 4px;

  border-radius: 2px;
  background-color: ${colors.N60};
`;
