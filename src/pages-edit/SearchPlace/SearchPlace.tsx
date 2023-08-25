import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import useDisplaySize from "hooks/useDisplaySize";
import { useAppSelector } from "hooks/useReduxHooks";
import useDebounce from "hooks/useDebounce";
import useGetSearch from "hooks/queries/search-places/useGetSearch";

import { colors } from "constants/colors";
import TopNavigation from "components/TopNavigation";
import Spacing from "components/Spacing";
import BackTitle from "components/Title/BackTitle";
import Input from "components/Input";
import NoneText from "./components/NoneText";
import ProfileSelection from "./components/ProfileSelection";
import Selection from "./components/Selection";
import AllDelete from "./components/AllDelete";
import CurrentSelection from "./components/CurrentSelection";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import LoadingCircle from "components/Loading/LoadingCircle";

export default function SearchPlace() {
  const router = useRouter();
  const scrollRef = useRef<any>(null);
  const infinityScrollRef = useRef<any>(null);
  const { height } = useDisplaySize();
  const { value } = useAppSelector((state) => state.search);

  const [titleChange, setTitleChange] = useState<boolean>(false);

  const [newValue, setNewValue] = useState<string>(value);
  const [currentSelection, setCurrentSelection] = useState<any>([]);

  const keyword = useDebounce(newValue, 300);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const local = JSON.parse(String(localStorage.getItem("currentSelection")));
    if (local) {
      setCurrentSelection(local);
    } else {
      localStorage.setItem("currentSelection", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    if (newValue === "") {
      setCurrentIndex(0);
    }
  }, [newValue]);

  const { data, isLoading, fetchNextPage, hasNextPage } = useGetSearch(
    currentIndex,
    keyword
  );
  useIntersectionObserver(infinityScrollRef, fetchNextPage, !!hasNextPage, {});

  return (
    <>
      <TitleWrapper visible={titleChange}>
        <BackTitle type="black-left-text" />
        <Input
          type="line"
          placeholder="지역, 음식점, 닉네임 검색"
          value={newValue}
          setValue={setNewValue}
        />
        <Spacing size={26} />
      </TitleWrapper>

      <Wrapper ref={scrollRef} height={height}>
        {newValue === "" ? (
          <>
            <Spacing size={124} />
            <Inner>
              <AllDelete setCurrentSelection={setCurrentSelection} />
              <Spacing size={30} />
              {currentSelection?.map((data: any, idx: number) => {
                return (
                  <CurrentSelection
                    key={idx}
                    idx={idx}
                    data={data}
                    newValue={newValue}
                    setCurrentSelection={setCurrentSelection}
                  />
                );
              })}
            </Inner>
          </>
        ) : (
          <TopNavigation
            type="search-place"
            scrollRef={scrollRef}
            scrollTop={0}
            topFixed={true}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            titleList={["지역", "음식점", "닉네임"]}
          >
            <TopNavigationInner
              height={
                data?.[0]?.contents?.length > (height - 181) / 79
                  ? "auto"
                  : height - 35 + "px"
              }
            >
              <Spacing size={146} />
              {currentIndex === 0 && !isLoading ? (
                data?.[0]?.contents && data?.[0]?.contents.length !== 0 ? (
                  <>
                    {data
                      ?.flatMap((page_data: any) => page_data.contents)
                      ?.map((data: any, idx: number) => {
                        return (
                          <Selection key={idx} type="location" data={data} />
                        );
                      })}
                    <div ref={infinityScrollRef} />
                    {hasNextPage ? (
                      <>
                        <LoadingCircle size={30} />
                        <Spacing size={30} />
                      </>
                    ) : null}
                  </>
                ) : (
                  <NoneText text="지역" />
                )
              ) : undefined}
            </TopNavigationInner>
            <TopNavigationInner
              height={
                data?.[0]?.documents?.length > (height - 181) / 79
                  ? "auto"
                  : height - 35 + "px"
              }
            >
              <Spacing size={146} />
              {currentIndex === 1 && !isLoading ? (
                data?.[0]?.documents && data?.[0]?.documents.length !== 0 ? (
                  <>
                    {data
                      ?.flatMap((page_data: any) => page_data.documents)
                      ?.map((data: any, idx: number) => {
                        return <Selection key={idx} type="store" data={data} />;
                      })}
                    <div ref={infinityScrollRef} />
                    {hasNextPage ? (
                      <>
                        <LoadingCircle size={30} />
                        <Spacing size={30} />
                      </>
                    ) : null}
                  </>
                ) : (
                  <NoneText text="음식점" />
                )
              ) : undefined}
            </TopNavigationInner>
            <TopNavigationInner
              height={
                data?.[0]?.contents?.length > (height - 181) / 62
                  ? "auto"
                  : height - 35 + "px"
              }
            >
              <Spacing size={146} />
              {currentIndex === 2 && !isLoading ? (
                data?.[0]?.contents && data?.[0]?.contents.length !== 0 ? (
                  <>
                    {data
                      ?.flatMap((page_data: any) => page_data.contents)
                      ?.map((data: any, idx: number) => {
                        return <ProfileSelection key={idx} data={data} />;
                      })}
                    <div ref={infinityScrollRef} />
                    {hasNextPage ? (
                      <>
                        <LoadingCircle size={30} />
                        <Spacing size={30} />
                      </>
                    ) : null}
                  </>
                ) : (
                  <NoneText text="닉네임" />
                )
              ) : undefined}
            </TopNavigationInner>
          </TopNavigation>
        )}
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

const TitleWrapper = styled.div<{ visible: boolean }>`
  width: 100%;
  padding: 0 20px;

  position: fixed;
  top: 0;
  z-index: 900;

  background-color: ${colors.N0};
`;

const Wrapper = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
  overflow-y: scroll;
  background-color: ${colors.N0};
`;

const Inner = styled.div<{ height?: number }>`
  height: ${({ height }) => height + "px"};
  padding: 0 20px;
`;

const TopNavigationInner = styled.div<{ height: any }>`
  height: ${({ height }) => height};
  padding: 0 20px;
`;
