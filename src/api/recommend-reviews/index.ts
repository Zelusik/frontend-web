import client from "api";
import { RecommendReviewType } from "types/review";

export const postRecommendReviews = async ({
  reviewId,
  ranking,
}: RecommendReviewType) =>
  await client
    .post(
      "/v1/members/recommended-reviews",
      { reviewId, ranking },
      { headers: { "Eatery-API-Minor-Version": 1 } }
    )
    .then(({ data }) => data)
    .catch((err) => err.response);

export const updateRecommendReviews = async (
  recommendedReviews: RecommendReviewType[]
) =>
  await client
    .put(
      "/v1/members/recommended-reviews/batch-update",
      { recommendedReviews },
      { headers: { "Eatery-API-Minor-Version": 1 } }
    )
    .then(({ data }) => data)
    .catch((err) => err.response);

export const getMyRecommendReviews = async () =>
  await client
    .get("/v1/members/me/recommended-reviews", {
      headers: { "Eatery-API-Minor-Version": 1 },
    })
    .then(({ data }) => data)
    .catch((err) => err.response);

export const getMembersRecommendReviews = async (memeberId: number) =>
  await client
    .get(`/v1/members/${memeberId}/recommended-reviews`, {
      headers: { "Eatery-API-Minor-Version": 1 },
    })
    .then(({ data }) => data)
    .catch((err) => err.response);
