import axios from "axios";

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
