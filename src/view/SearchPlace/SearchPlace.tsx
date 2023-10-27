/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import useDisplaySize from "hooks/useDisplaySize";
import { useAppDispatch } from "hooks/useReduxHooks";
import useGetFilteringKeywords from "hooks/queries/mark/useGetFilteringKeywords";
import { editDisplaySize } from "reducer/slices/global/globalSlice";

import BottomNavigation from "components/BottomNavigation";
import { globalValue } from "constants/globalValue";
import { TopNavigation } from "components/TopNavigation";
import LoadingCircle from "components/Loading/LoadingCircle";
import { colors } from "constants/colors";
import Title from "components/Title";
import { Box, Input, ScrollArea, Space } from "components/core";

import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { useAppSelector } from "hooks/useReduxHooks";
import useDebounce from "hooks/useDebounce";
import useGetSearch from "hooks/queries/search-places/useGetSearch";

import BackTitle from "components/Title/BackTitle";
import NoneText from "./components/NoneText";
import ProfileSelection from "./components/ProfileSelection";
import Selection from "./components/Selection";
import AllDelete from "./components/AllDelete";
import CurrentSelection from "./components/CurrentSelection";
import useIntersectionObserver from "hooks/useIntersectionObserver";
// import LocationContainer from "./components/LocationContainer";
import BackArrow from "components/Button/IconButton/BackArrow";

const SearchPlace = () => {
  const dispatch = useAppDispatch();

  //
  const router = useRouter();
  const scrollRef = useRef<any>(null);
  const infinityScrollRef = useRef<any>(null);
  const { width, height } = useDisplaySize();
  dispatch(
    editDisplaySize({
      type: "display",
      value: [width, height],
    })
  );
  const { value } = useAppSelector((state) => state.search);
  const [newValue, setNewValue] = useState<string>(value);
  const [currentSelection, setCurrentSelection] = useState<any>([]);

  const keyword = useDebounce(newValue, 300);
  const [touch, setTouch] = useState<boolean>(false);
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

  const { searchDatas, isLoading, fetchNextPage, hasNextPage } = useGetSearch(
    currentIndex,
    keyword
  );
  useIntersectionObserver(infinityScrollRef, fetchNextPage, !!hasNextPage, {});

  return (
    <>
      <Box ph={20}>
        <Title height={50} renderLeft={<BackArrow color="N100" />} />
        <Input
          type="line"
          placeholder="지역, 음식점, 닉네임 검색"
          value={newValue}
          setValue={setNewValue}
        />
        <Space h={26} />
      </Box>

      <Box h={height - 126}>
        {newValue === "" ? (
          <Box h={height} ph={20}>
            <AllDelete setCurrentSelection={setCurrentSelection} />
            <Space h={30} />
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
          </Box>
        ) : (
          <TopNavigation
            height={34}
            padding={20}
            gap={20}
            index={{ currentIndex, setCurrentIndex }}
            touch={{ touch, setTouch }}
            keywordDatas={["지역", "음식점", "닉네임"]}
          >
            <ScrollArea scroll="y" h={height - 161} ph={20}>
              <Space h={20} />
              {currentIndex === 0 &&
                (searchDatas?.[0]?.contents &&
                searchDatas?.[0]?.contents.length !== 0 ? (
                  <>
                    {searchDatas
                      ?.flatMap((page_data: any) => page_data.contents)
                      ?.map((data: any, idx: number) => {
                        return (
                          <Selection
                            key={idx}
                            type="location"
                            data={data}
                            keyword={keyword}
                          />
                        );
                      })}
                    <div ref={infinityScrollRef} />
                    {hasNextPage && (
                      <>
                        <LoadingCircle height={30} />
                        <Space h={30} />
                      </>
                    )}
                  </>
                ) : (
                  <NoneText text="지역" />
                ))}
            </ScrollArea>
            <ScrollArea scroll="y" h={height - 161} ph={20}>
              <Space h={20} />
              {currentIndex === 1 &&
                (searchDatas?.[0]?.documents &&
                searchDatas?.[0]?.documents.length !== 0 ? (
                  <>
                    {searchDatas
                      ?.flatMap((page_data: any) => page_data.documents)
                      ?.map((data: any, idx: number) => {
                        return (
                          <Selection
                            key={idx}
                            type="store"
                            data={data}
                            keyword={keyword}
                          />
                        );
                      })}
                    <div ref={infinityScrollRef} />
                    {hasNextPage && (
                      <>
                        <LoadingCircle height={30} />
                        <Space h={30} />
                      </>
                    )}
                  </>
                ) : (
                  <NoneText text="음식점" />
                ))}
            </ScrollArea>
            <ScrollArea scroll="y" h={height - 161} ph={20}>
              <Space h={20} />
              {currentIndex === 2 &&
                (searchDatas?.[0]?.contents &&
                searchDatas?.[0]?.contents.length !== 0 ? (
                  <>
                    {searchDatas
                      ?.flatMap((page_data: any) => page_data.contents)
                      ?.map((data: any, idx: number) => {
                        return (
                          <ProfileSelection
                            key={idx}
                            data={data}
                            keyword={keyword}
                          />
                        );
                      })}
                    <div ref={infinityScrollRef} />
                    {hasNextPage && (
                      <>
                        <LoadingCircle height={30} />
                        <Space h={30} />
                      </>
                    )}
                  </>
                ) : (
                  <NoneText text="닉네임" />
                ))}
            </ScrollArea>
          </TopNavigation>
        )}
      </Box>
    </>
  );
};

export default SearchPlace;
