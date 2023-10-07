import React, { useEffect, forwardRef, useRef } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import useGetBookmarks from "hooks/queries/mark/useGetBookmarks";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import { useAppSelector } from "hooks/useReduxHooks";
import {
  getBookmarksContentsProps,
  getBookmarksProps,
} from "models/view/markModel";

import NewButton from "view/Mypage/components/NewButton";
import { Route } from "constants/Route";
import { globalValue } from "constants/globalValue";
import { typography } from "constants/typography";
import { colors } from "constants/colors";
import LoadingCircle from "components/Loading/LoadingCircle";
import StoreCard from "./StoreCard";
import StoreCount from "./StoreCount";
import NothingButton from "components/Button/NothingButton";
import { Box, ScrollArea, Space } from "components/core";

interface StoreCardContainerProps {
  key?: number;
  touch: any;
  type: string;
  keyword: string;
  children?: React.ReactNode;
}

const StoreCardContainer = forwardRef(function Div(
  { touch, type, keyword, children }: StoreCardContainerProps,
  ref: any
) {
  const router = useRouter();
  const infinityScrollRef = useRef<any>(null);
  const { display } = useAppSelector((state) => state.global);
  //   react-query: mark
  const { markDatas, isLoadingMark, fetchNextPage, hasNextPage } =
    useGetBookmarks({
      type,
      keyword,
    });
  useIntersectionObserver(infinityScrollRef, fetchNextPage, !!hasNextPage, {});

  const handleClick = () => {
    router.push(Route.HOME());
  };

  if (display.width === 0 || isLoadingMark)
    return (
      <LoadingCircle
        height={display.height - 100 - globalValue.BOTTOM_NAVIGATION_HEIGHT}
      />
    );

  return (
    <ScrollArea
      h={display.height - 100 - globalValue.BOTTOM_NAVIGATION_HEIGHT}
      bg="Mark"
      // scrollbarSize={0}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {markDatas?.[0]?.totalElements !== 0 ? (
          <>
            <StoreCount
              count={isLoadingMark ? 0 : markDatas?.[0]?.totalElements}
            />
            {markDatas
              ?.flatMap((place_data: getBookmarksProps) => place_data?.contents)
              ?.map((markData: getBookmarksContentsProps) => (
                <StoreCard
                  key={markData?.id}
                  touch={touch}
                  markData={markData}
                />
              ))}
            <Box viewportRef={infinityScrollRef} />
            {hasNextPage && (
              <>
                <LoadingCircle height={30} />
                <Space h={20} />
              </>
            )}
          </>
        ) : (
          <NothingButton
            height={display.height - 100 - globalValue.BOTTOM_NAVIGATION_HEIGHT}
            text="아직 저장된 음식점이 없습니다"
            buttonText="음식점 리뷰 둘러보기"
            buttonClick={handleClick}
          />
        )}
      </motion.div>
    </ScrollArea>
  );
});

export default StoreCardContainer;
