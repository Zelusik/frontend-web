import client from "api";
import { ReviewType } from "types/review";

export const getReviews = async (params: any) => {
  params.headers = { "Eatery-API-Minor-Version": 1 };
  return await client
    .get(`/v1/reviews?`, params)
    .then(({ data }) => data)
    .catch((err) => console.log(err.response));
};

export const getReviewsId = async (reviewId: any) =>
  await client
    .get(`/v1/reviews/${reviewId}`, { headers: { "Eatery-API-Minor-Version": 1 } })
    .then(({ data }) => data)
    .catch((err) => err.response);

export const deleteReview = async (reviewId: any) =>
  await client
    .delete(`/v1/reviews/${reviewId}`, {
      headers: { "Eatery-API-Minor-Version": 1 },
    })
    .then(({ data }) => data)
    .catch((err) => err.response);

export const getAutoReview = async ({ keywords, foodInfo }: any) =>
  client
    .get("/v1/reviews/contents/auto-creations", {
      headers: { "Eatery-API-Minor-Version": 1 },
      params: {
        placeKeywords: keywords.join(","),
        menus: foodInfo.map((e: any) => e.foodName).join(","),
        menuKeywords: foodInfo.map((e: any) => e.foodKeyword.join("+")).join(","),
      },
    })
    .then(({ data }) => data)
    .catch((err) => err.response);

export const postReview = async (reviewData: ReviewType) => {
  const formData = new FormData();
  function base64toFile(base_data: any, filename: any) {
    var arr = base_data.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  try {
    formData.append("placeId", String(reviewData.placeId));
    formData.append("keywords", String(reviewData.keywords));
    formData.append("autoCreatedContent", String(reviewData.autoCreatedContent));
    formData.append("content", String(reviewData.content));

    reviewData.images.forEach((imageData, index) => {
      const file = base64toFile(imageData.image, "image_file.png");
      formData.append(`images[${index}].image`, file);

      if (imageData.menuTags && imageData.menuTags.length > 0) {
        imageData.menuTags.map((tag, tagIndex) => {
          if (tag && tag.content && tag.point) {
            formData.append(
              `images[${index}].menuTags[${tagIndex}].content`,
              tag.content
            );
            formData.append(
              `images[${index}].menuTags[${tagIndex}].point.x`,
              String(tag.point.x)
            );
            formData.append(
              `images[${index}].menuTags[${tagIndex}].point.y`,
              String(tag.point.y)
            );
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
  }

  return await client
    .post("/v1/reviews", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Eatery-API-Minor-Version": 1,
      },
    })
    .then(({ data }) => data)
    .catch((err) => err.response);
};

export const getFeed = async (page: number) =>
  await client
    .get("/v1/reviews/feed", {
      headers: { "Eatery-API-Minor-Version": 1 },
      params: { page, size: 10 },
    })
    .then(({ data }) => data)
    .catch((err) => err.response);

export const getMyReviews = async ({ page, size }: { page: number; size: number }) =>
  await client
    .get("/v1/reviews/me", {
      headers: { "Eatery-API-Minor-Version": 1 },
      params: { page, size },
    })
    .then(({ data }) => data)
    .catch((err) => err.response);

export const editReview = async ({
  reviewId,
  content,
}: {
  reviewId: number;
  content: string;
}) =>
  await client
    .patch(
      `/v1/reviews/${reviewId}`,
      { content },
      { headers: { "Eatery-API-Minor-Version": 1 } }
    )
    .then(({ data }) => data)
    .catch((err) => err.response);
