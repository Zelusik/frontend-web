import client from 'api';

export const reportPlace = async (reportInfo: {
  placeId: number;
  reasonOption: string;
  reasonDetail: string;
}) =>
  await client
    .post('/v1/reports/places', reportInfo, {
      headers: { 'Eatery-API-Minor-Version': 1 },
    })
    .then(({ data }) => data)
    .catch((err) => err.response);
