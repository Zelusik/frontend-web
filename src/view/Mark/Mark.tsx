/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import useDisplaySize from "hooks/useDisplaySize";
import { useAppDispatch } from "hooks/useReduxHooks";
import useGetFilteringKeywords from "hooks/queries/mark/useGetFilteringKeywords";
import { editDisplaySize } from "reducer/slices/global/globalSlice";

import BottomNavigation from "components/BottomNavigation";
import { globalValue } from "constants/globalValue";
import StoreCardContainer from "./components/StoreCardContainer";
import { TopNavigation } from "components/TopNavigation";
import LoadingCircle from "components/Loading/LoadingCircle";
import { colors } from "constants/colors";
import Title from "components/Title";
import { Box, Space } from "components/core";

const Mark = () => {
  const dispatch = useAppDispatch();
  const { width, height } = useDisplaySize();
  dispatch(
    editDisplaySize({
      type: "display",
      value: [width, height],
    })
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touch, setTouch] = useState(false);

  const { keywordDatas: data, isLoadingKeyword } = useGetFilteringKeywords();
  const keywordDatas = data?.keywords && [
    {
      keyword: "전체",
      type: "",
    },
    ...data?.keywords,
  ];
  const keywordTextDatas: string[] = keywordDatas?.map(
    (keywordInfo: { keyword: string; type: string }) => keywordInfo?.keyword
  );

  return (
    <>
      <Title
        height={50}
        padding={20}
        background="Mark"
        textLeft="저장한 음식점"
      />
      <Box h={height - 50 - globalValue.BOTTOM_NAVIGATION_HEIGHT} bg="Mark">
        {isLoadingKeyword ? (
          <LoadingCircle
            height={height - 50 - globalValue.BOTTOM_NAVIGATION_HEIGHT}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Space h={20} />
            <TopNavigation
              height={34}
              padding={20}
              gap={20}
              color="Orange600"
              index={{ currentIndex, setCurrentIndex }}
              touch={{ touch, setTouch }}
              keywordDatas={keywordTextDatas}
            >
              {keywordDatas?.map((_: any, idx: number) => {
                return (
                  <StoreCardContainer
                    key={idx}
                    touch={{ touch, setTouch }}
                    type={keywordDatas?.[idx]?.type}
                    keyword={keywordDatas?.[idx]?.keyword}
                  />
                );
              })}
            </TopNavigation>
          </motion.div>
        )}
      </Box>
      <BottomNavigation />
    </>
  );
};

export default Mark;
