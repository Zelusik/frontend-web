import { useRef } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import useDisplaySize from "hooks/useDisplaySize";
import useGetFeed from "hooks/queries/home/useGetFeed";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import { globalValue } from "constants/globalValue";

import SearchTitle from "components/Title/SearchTitle";
import Text from "components/Text";
import BottomNavigation from "components/BottomNavigation";
import Spacing from "components/Spacing";
import LoadingCircle from "components/Loading/LoadingCircle";
import StoreCard from "./components/StoreCard";

export default function Home() {
  const infinityScrollRef = useRef(null);
  const { height } = useDisplaySize();

  const { data, isLoading, fetchNextPage, hasNextPage } = useGetFeed();
  useIntersectionObserver(infinityScrollRef, fetchNextPage, !!hasNextPage, {});

  return (
    <>
      <SearchTitle type="home" />
      <Wrapper height={height - 50 - globalValue.BOTTOM_NAVIGATION_HEIGHT}>
        <Spacing size={20} />
        <Text typo="Headline6" color="N100">
          오늘은
          <br />
          어디로 갈까요?
        </Text>
        <Spacing size={30} />
        {isLoading ? (
          <LoadingCircle
            size={height - 170 - globalValue.BOTTOM_NAVIGATION_HEIGHT}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {data
              ?.flatMap((page_data: any) => page_data.contents)
              ?.map((data) => {
                return <StoreCard key={data?.id} data={data} />;
              })}
          </motion.div>
        )}
        <div ref={infinityScrollRef} />
        {hasNextPage ? (
          <>
            <LoadingCircle size={30} />
            <Spacing size={30} />
          </>
        ) : null}
      </Wrapper>
      <BottomNavigation />
    </>
  );
}

const Wrapper = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
  padding: 0 20px;
  overflow-y: scroll;
`;
