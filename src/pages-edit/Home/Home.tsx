import styled from "@emotion/styled";
import useDisplaySize from "hooks/useDisplaySize";
import { globalValue } from "constants/globalValue";

import SearchTitle from "components/Title/SearchTitle";
import Text from "components/Text";
import BottomNavigation from "components/BottomNavigation";
import Spacing from "components/Spacing";

import StoreCard from "./components/StoreCard";
import useGetFeed from "hooks/queries/review/useGetFeed";
import { useRef } from "react";
import useIntersectionObserver from "hooks/useIntersectionObserver";

export default function Home() {
  const { height } = useDisplaySize();
  const { data, fetchNextPage, hasNextPage } = useGetFeed();
  const scrollRef = useRef(null);

  useIntersectionObserver(scrollRef, fetchNextPage, !!hasNextPage, {});

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
        {data
          ?.flatMap((page_data) => page_data.contents)
          .map((data) => (
            <StoreCard key={data.id} data={data} />
          ))}
        <div ref={scrollRef} style={{ height: "30px" }}></div>
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
