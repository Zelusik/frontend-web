import React from "react";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import { useQuery } from "react-query";
import { changeReviewInfo } from "reducer/slices/review/reviewSlice";
import { getAutoReview } from "api/reviews";

const useGetAutoReview = (isButtonClicked: boolean) => {
  const dispatch = useAppDispatch();
  const { keywords, foodInfo } = useAppSelector((state) => state.review);
  const { data, isLoading, error, refetch } = useQuery(
    ["autoReview", keywords, foodInfo],
    async () => {
      const result = await getAutoReview({ keywords, foodInfo });
      if (result.status === 404) {
      } else {
        dispatch(
          changeReviewInfo({
            type: "autoCreatedContent",
            value: result.content,
          })
        );
        dispatch(
          changeReviewInfo({
            type: "content",
            value: result.content,
          })
        );
      }
    },
    {
      enabled: isButtonClicked,
    }
  );
  return { data, isLoading, error, refetch };
};

export default useGetAutoReview;
