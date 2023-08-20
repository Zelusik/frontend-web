import { getMyReviews } from "api/reviews";
import React from "react";

import { useQuery } from "react-query";

const useGetMyReviews = ({ page }: { page: number }) => {
  const { data, error, isLoading } = useQuery(
    ["myreview", page],
    async () =>
      await getMyReviews({
        page: page ? page : 0,
        size: 20,
      })
  );
  return { data, error, isLoading };
};

export default useGetMyReviews;
