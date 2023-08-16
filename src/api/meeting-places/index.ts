import client from "api";

export const getMeetingPlaces = async (params: any) =>
  await client
    .get(`/meeting-places`, params)
    .then(({ data }) => data)
    .catch((err) => console.log(err.response));
