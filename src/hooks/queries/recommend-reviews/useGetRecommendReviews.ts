import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import {
  getMembersRecommendReviews,
  getMyRecommendReviews,
} from "api/recommend-reviews";

const useGetRecommendReviews = () => {
  const { query } = useRouter();
  const memberId: any = query.id;

  const { data, isLoading, error, refetch } = useQuery(
    ["recommendReviews", memberId],
    async () => {
      if (memberId) {
        const res = await getMembersRecommendReviews(Number(memberId));
        return res.recommendedReviews;
      } else {
        const res = await getMyRecommendReviews();
        return res.recommendedReviews;
      }
    },
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
    }
  );
  return { data, isLoading, error, refetch };
};

export default useGetRecommendReviews;
