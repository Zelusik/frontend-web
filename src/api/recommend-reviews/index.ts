import client from "api";
import { RecommendReviewType } from "types/review";

export const postRecommendReviews = async ({
  reviewId,
  ranking,
}: RecommendReviewType) =>
  await client
    .post("/members/recommended-reviews", { reviewId, ranking })
    .then(({ data }) => data)
    .catch((err) => err.response);

export const updateRecommendReviews = async (
  recommendedReviews: RecommendReviewType[]
) =>
  await client
    .put("/members/recommended-reviews/batch-update", { recommendedReviews })
    .then(({ data }) => data)
    .catch((err) => err.response);

export const getMyRecommendReviews = async () =>
  await client
    .get("/members/me/recommended-reviews")
    .then(({ data }) => data)
    .catch((err) => err.response);

export const getMembersRecommendReviews = async (memeberId: number) =>
  await client
    .get(`/members/${memeberId}/recommended-reviews`)
    .then(({ data }) => data)
    .catch((err) => err.response);
