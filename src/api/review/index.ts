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

export const getMenus = async (kakaoPid: string, accessToken: string) =>
  await axios
    .get(`http://54.180.188.181:8081/places/scraping/menus`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        kakaoPid,
      },
    })
    .then(({ data }) => data)
    .catch((err) => console.log(err.response));
