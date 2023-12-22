import client from "@/api";

export const getMeetingPlaces = async (params: any) => {
  params.headers = { "Eatery-API-Minor-Version": 1 };
  return await client
    .get(`/v1/meeting-places`, params)
    .then(({ data }) => data)
    .catch((err) => console.log(err.response));
};
