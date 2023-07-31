import client from "api";
import { PlaceType } from "types/review";

export const postPlace = async (placeInfo: PlaceType) =>
  await client
    .post("/places", placeInfo)
    .then(({ data }) => data)
    .catch((err) => err.response);

export const getPlace = async (kakaoPid: string) =>
  await client
    .get("/places", { params: { kakaoPid } })
    .then(({ data }) => data)
    .catch((err) => err.response);
