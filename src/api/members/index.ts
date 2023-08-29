import client from "api";
import { TermsType } from "types/auth";

export const getMembersSearch = async (params: any) =>
  await client
    .get(`/members/search?`, params)
    .then(({ data }) => data)
    .catch((err) => console.log(err.response));

export const getMyInfo = async () =>
  await client
    .get("/members/me")
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
    .put("/members", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(({ data }) => data)
    .catch((err) => err.response);
};

export const deleteUser = async (surveyType: string) =>
  await client
    .delete("/members", { data: { surveyType } })
    .then(({ data }) => data)
    .catch((err) => err.response);

export const PostTerms = async (token: any, termsData: TermsType) =>
  await client
    .post("/members/terms", termsData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => data)
    .catch((err) => err.response);

export const PutTaste = async (token: any, favoriteFoodCategories: string[]) =>
  await client
    .put(
      "/members/favorite-food",
      { favoriteFoodCategories },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err.response);

export const getMyProfile = async () =>
  await client
    .get("/members/me/profile")
    .then(({ data }) => data)
    .catch((err) => err.response);
