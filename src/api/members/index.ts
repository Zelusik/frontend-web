import client from "api";

export const getMembersSearch = async (params: any) =>
  await client
    .get(`/members/search?`, params)
    .then(({ data }) => data)
    .catch((err) => console.log(err.response));
