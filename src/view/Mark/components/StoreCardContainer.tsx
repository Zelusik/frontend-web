import React, { useEffect, forwardRef, useRef } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import useGetBookmarks from "hooks/queries/mark/useGetBookmarks";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import { useAppSelector } from "hooks/useReduxHooks";
import {
  getBookmarksContentsProps,
  getBookmarksProps,
} from "models/view/markModel";

import { Route } from "constants/Route";
import { globalValue } from "constants/globalValue";
import LoadingCircle from "components/Loading/LoadingCircle";
import StoreCard from "./StoreCard";
import StoreCount from "./StoreCount";
import NothingButton from "components/Button/NothingButton";
import { ScrollArea, Box, Space } from "components/core";

interface StoreCardContainerProps {
  key?: number;
  isEnabled: boolean;
  touch: any;
  type: string;
  keyword: string;
  children?: React.ReactNode;
}

const StoreCardContainer = forwardRef(function Div(
  { isEnabled, touch, type, keyword, children }: StoreCardContainerProps,
  ref: any
) {
  const router = useRouter();
  const infinityScrollRef = useRef<any>(null);
  const { display } = useAppSelector((state) => state.global);
  //   react-query: mark
  const { markDatas, isLoadingMark, fetchNextPage, hasNextPage } =
    useGetBookmarks({
      isEnabled,
      type,
      keyword,
    });
  useIntersectionObserver(infinityScrollRef, fetchNextPage, !!hasNextPage, {});

  const handleClick = () => {
    router.push(Route.HOME());
  };

  return (
    <ScrollArea
      scroll="y"
      h={display.height - 100 - globalValue.BOTTOM_NAVIGATION_HEIGHT}
      bg="Mark"
    >
      <motion.div
        animate={markDatas?.[0]?.contents?.length !== 0 && "open"}
        variants={{
          open: { opacity: [0, 1] },
        }}
        transition={{ duration: 0.5 }}
      >
        {markDatas?.[0]?.totalElements !== 0 ? (
          <>
            <StoreCount
              count={isLoadingMark ? 0 : markDatas?.[0]?.totalElements}
            />
            {isLoadingMark ? (
              <LoadingCircle
                height={
                  display.height - 152 - globalValue.BOTTOM_NAVIGATION_HEIGHT
                }
              />
            ) : (
              <>
                {markDatas
                  ?.flatMap(
                    (place_data: getBookmarksProps) => place_data?.contents
                  )
                  ?.map((markData: getBookmarksContentsProps) => (
                    <StoreCard
                      key={markData?.id}
                      touch={touch}
                      markData={markData}
                    />
                  ))}
                <Box veiwportRef={infinityScrollRef} />
                {hasNextPage && (
                  <>
                    <LoadingCircle height={30} />
                    <Space h={20} />
                  </>
                )}
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
