import client from "api";
import { RecommendReviewType } from "types/review";

export const postRecommendReviews = async ({
  reviewId,
  ranking,
}: RecommendReviewType) =>
  await client
    .post("/recommended-reviews", { reviewId, ranking })
    .then(({ data }) => data)
    .catch((err) => err.response);

export const updateRecommendReviews = async (
  recommendedReviews: RecommendReviewType[]
) =>
  await client
    .put("/recommended-reviews/batch-update", { recommendedReviews })
    .then(({ data }) => data)
    .catch((err) => err.response);
