import client from "api";
import { TermsType } from "types/auth";

export const getMembersSearch = async (params: any) => {
  params.headers = { "Eatery-API-Minor-Version": 1 };
  return await client
    .get(`/v1/members/search?`, params)
    .then(({ data }) => data)
    .catch((err) => console.log(err.response));
};

export const getMyInfo = async () =>
  await client
    .get("/v1/members/me", { headers: { "Eatery-API-Minor-Version": 1 } })
    .then(({ data }) => data)
    .catch((err) => err.response);

export const editMyInfo = async (myInfo: any) => {
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

  formData.append("nickname", myInfo.nickname);
  formData.append("birthDay", myInfo.birthDay);
  formData.append("gender", myInfo.gender);

  if (myInfo.profileImage) {
    const file = base64toFile(myInfo.profileImage, "profileImage.png");
    formData.append("profileImage", file);
  }

  return await client
    .put("/v1/members", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Eatery-API-Minor-Version": 1,
      },
    })
    .then(({ data }) => data)
    .catch((err) => err.response);
};

export const deleteUser = async (surveyType: string) =>
  await client
    .delete("/v1/members", {
      headers: { "Eatery-API-Minor-Version": 1 },
      data: { surveyType },
    })
    .then(({ data }) => data)
    .catch((err) => err.response);

export const postTerms = async (token: any, termsData: TermsType) =>
  await client
    .post("/v1/members/terms", termsData, {
      headers: { Authorization: `Bearer ${token}`, "Eatery-API-Minor-Version": 1 },
    })
    .then(({ data }) => data)
    .catch((err) => err.response);

export const putTaste = async (token: any, favoriteFoodCategories: string[]) => {
  const config: any = {
    headers: { "Eatery-API-Minor-Version": 1 },
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return await client
    .put("/v1/members/favorite-food", { favoriteFoodCategories }, config)
    .then(({ data }) => data)
    .catch((err) => err.response);
};

export const getMyProfile = async () =>
  await client
    .get("/v1/members/me/profile", { headers: { "Eatery-API-Minor-Version": 1 } })
    .then(({ data }) => data)
    .catch((err) => err.response);

export const getMembersProfile = async (memberId: number) =>
  await client
    .get(`/v1/members/${memberId}/profile`, {
      headers: { "Eatery-API-Minor-Version": 1 },
    })
    .then(({ data }) => data)
    .catch((err) => err.response);
