import { getMyReviews, getReviews } from "api/reviews";
import { useRouter } from "next/router";
import React from "react";
import { useInfiniteQuery } from "react-query";

const useGetMembersReviews = () => {
  const { query } = useRouter();
  const writerId: any = query.id;
  const {
    data: responseData,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["membersReviews", writerId],
    async ({ pageParam = 0 }) => {
      if (writerId) {
        const params: any = {
          params: {
            writerId: writerId,
            page: pageParam,
            size: 15,
            embed: "PLACE",
          },
        };
        const res = await getReviews(params);
        return res;
      } else {
        const res = await getMyReviews({
          page: pageParam,
          size: 20,
        });
        return res;
      }
    },
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      getNextPageParam: (lastPage) => {
        return lastPage.isLast ? undefined : lastPage.number + 1;
      },
    }
  );
  const data = responseData?.pages;
  return { data, isLoading, fetchNextPage, hasNextPage };
};

export default useGetMembersReviews;
