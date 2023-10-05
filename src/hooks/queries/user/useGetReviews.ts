import { getMyReviews, getReviews, reviewsApi } from "api/reviews";
import { useRouter } from "next/router";
import { useInfiniteQuery } from "react-query";

const useGetReviews = () => {
  const { query } = useRouter();
  const writerId: any = query.id;
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["membersReviews", writerId],
    async ({ pageParam = 0 }) => {
      if (writerId) {
        const params: any = {
          params: {
            writerId: writerId,
            page: pageParam,
            size: 10,
            embed: "PLACE",
          },
        };
        const res = await reviewsApi.getReviews(params);
        return res;
      } else {
        const res = await reviewsApi.getReviewsMe({
          page: pageParam,
          size: 10,
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
  return {
    reviewDatas: data?.pages,
    isLoadingReview: isLoading,
    fetchNextPage,
    hasNextPage,
  };
};

export default useGetReviews;
