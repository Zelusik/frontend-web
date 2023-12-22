/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import useDisplaySize from "@/hooks/useDisplaySize";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { editDisplaySize } from "@/reducer/slices/global/globalSlice";

import { TopNavigation } from "@/components/TopNavigation";
import Title from "@/components/Title";
import { Box, Input, ScrollArea, Space } from "@/components/core";

import { useAppSelector } from "@/hooks/useReduxHooks";
import useDebounce from "@/hooks/useDebounce";

import AllDelete from "./components/AllDelete";
import CurrentSelection from "./components/CurrentSelection";
import BackArrow from "@/components/Button/IconButton/BackArrow";
import LocationContainer from "./components/LocationContainer";
import StoreContainer from "./components/StoreContainer";
import ProfileContainer from "./components/ProfileContainer";

const SearchPlace = () => {
  const dispatch = useAppDispatch();
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
            <LocationContainer currentIndex={currentIndex} keyword={keyword} />
            <StoreContainer currentIndex={currentIndex} keyword={keyword} />
            <ProfileContainer currentIndex={currentIndex} keyword={keyword} />
          </TopNavigation>
        )}
      </Box>
    </>
  );
};

export default SearchPlace;
