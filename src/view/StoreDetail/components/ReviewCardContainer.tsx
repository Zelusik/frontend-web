import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import useGetReviews from "hooks/queries/user/useGetReviews";
import { useAppSelector } from "hooks/useReduxHooks";

import { InnerTopNavigation } from "components/TopNavigation";
import LoadingCircle from "components/Loading/LoadingCircle";
import { Space } from "components/core";

import ReviewCard from "./ReviewCard";

interface ReviewCardContainerProps {
  refs?: any;
  mine?: boolean;
  direction?: string;
  touch?: any;
  imageSize: number;
  data?: any;
  hasNextPage?: any;
}

const ReviewCardContainer = ({
  refs,
  direction,
  touch,
  imageSize = 0,
  data,
  hasNextPage,
}: ReviewCardContainerProps) => {
  const scrollRef = useRef<any>(null);

  return (
    <InnerTopNavigation
      scrollRef={refs?.[0]}
      innerScrollRef={refs?.[1]}
      scroll={imageSize + 155}
      padding={20}
      bottomHeight={85}
      direction={direction}
    >
      <Space h={30} />
      {data
        ?.flatMap((page_data: any) => page_data?.contents)
        ?.map((review: any, idx: number) => {
          return <ReviewCard key={idx} data={review} />;
        })}
      <div ref={scrollRef} />
      {hasNextPage && (
        <>
          <LoadingCircle height={30} />
          <Space h={30} />
        </>
      )}
    </InnerTopNavigation>
  );
};

export default ReviewCardContainer;
