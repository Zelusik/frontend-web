import client from "api";
import axios from "axios";
import { ReviewType } from "types/review";

export const getReviews = async (params: any) =>
  await client
    .get(`/reviews?`, params, {})
    .then(({ data }) => data)
    .catch((err) => console.log(err.response));

export const getAutoReview = async ({ keywords, foodInfo }: any) =>
  client
    .get("/reviews/contents/auto-creations", {
      params: {
        placeKeywords: keywords.join(","),
        menus: foodInfo.map((e: any) => e.foodName).join(","),
        menuKeywords: foodInfo
          .map((e: any) => e.foodKeyword.join("+"))
          .join(","),
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
    formData.append(
      "autoCreatedContent",
      String(reviewData.autoCreatedContent)
    );
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
    .post("/reviews", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(({ data }) => data)
    .catch((err) => err.response);
};

export const kakaoSearchKeyword = async (
  x: number,
  y: number,
  keyword: string,
  page: number,
  Fn: any
) => {
  let param = "";
  if (x !== 0 && y !== 0) {
    param += `x=${x}&y=${y}&radius=1000&sort=distance`;
    keyword = "음식점";
  } else {
    param += "radius=1000";
  }

  await axios
    .get(`https://dapi.kakao.com/v2/local/search/keyword.json?${param}`, {
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_SEARCH_API_KEY}`,
      },
      params: {
        page: page,
        query: keyword,
        category_group_code: "FD6,CE7",
        size: 15,
      },
    })
    .then(({ data }) => {
      Fn(data, page);
    })
    .catch((err) => {
      console.log("kakao keyword err");
    });
};
