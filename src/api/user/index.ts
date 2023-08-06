import client from "api";

export const getMyInfo = async () =>
  await client
    .get("/members")
    .then(({ data }) => data)
    .catch((err) => err.response);

export const editMyInfo = async (myInfo: any) => {
  // 프로필 이미지 수정 시 formdata에 추가
  let formdata = new FormData();
  formdata.append("nickname", myInfo.nickname);
  formdata.append("birthday", myInfo.birthDay);
  formdata.append("gender", myInfo.gender);

  return await client
    .put("/members", myInfo, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(({ data }) => data)
    .catch((err) => err.response);
};
