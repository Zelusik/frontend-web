import { useRef } from 'react';
import { motion } from 'framer-motion';
import useDisplaySize from 'hooks/useDisplaySize';
import useGetFeed from 'hooks/queries/home/useGetFeed';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import { getFeedContentsProps, getFeedProps } from 'models/view/homeModel';
import { globalValue } from 'constants/globalValue';

import { Box, ScrollArea, Space, Text } from 'components/core';
import BottomNavigation from 'components/BottomNavigation';
import LoadingCircle from 'components/Loading/LoadingCircle';
import Icon from 'components/Icon';
import Title from 'components/Title';
import ReviewCard from './components/ReviewCard';

export default function Home() {
  const infinityScrollRef = useRef(null);
  const { height } = useDisplaySize();

  const { feedDatas, isLoading, fetchNextPage, hasNextPage } = useGetFeed();
  useIntersectionObserver(infinityScrollRef, fetchNextPage, !!hasNextPage, {});

  return (
    <>
      <Title height={50} padding={20} renderLeft={<Icon icon="Logo" />} />
      {isLoading ? (
        // <LoadingCircle
        //   height={height - 50 - globalValue.BOTTOM_NAVIGATION_HEIGHT}
        // />
        <></>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ScrollArea
            scroll="y"
            h={height - 50 - globalValue.BOTTOM_NAVIGATION_HEIGHT}
            ph={20}
          >
            <Space h={20} />
            <Text c="N100" typo="Headline6">
              오늘은
              <br />
              어디로 갈까요?
            </Text>
            <Space h={30} />
            {feedDatas
              ?.flatMap((page_data: getFeedProps) => page_data?.contents)
              ?.map((feedData: getFeedContentsProps) => (
                <ReviewCard key={feedData?.id} feedData={feedData} />
              ))}
            <Box veiwportRef={infinityScrollRef} />
            {hasNextPage ? (
              <>
                <LoadingCircle height={30} />
                <Space h={30} />
              </>
            ) : null}
          </ScrollArea>
        </motion.div>
      )}
      <BottomNavigation />
    </>
  );
}
