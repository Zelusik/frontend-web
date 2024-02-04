import client from 'api';

export const reportReview = async (reportInfo: {
  reviewId: number;
  reasonOption: string;
  reasonDetail: string;
}) =>
  await client
    .post('/v1/reports/reviews', reportInfo, {
      headers: { 'Eatery-API-Minor-Version': 1 },
    })
    .then(({ data }) => data)
    .catch((err) => err.response);
