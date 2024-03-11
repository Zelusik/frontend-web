import client from 'api';
import { useRouter } from 'next/router';

// 장소 북마크
export const postBookmarks = async (placeId: number) => {
  try {
    const response = await client.post(
      '/v1/bookmarks',
      {},
      { headers: { 'Eatery-API-Minor-Version': 1 }, params: { placeId } }
    );
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
};

// 장소 북마크 취소
export const deleteBookmarks = async (placeId: number) => {
  try {
    const response = await client.delete('/v1/bookmarks', {
      headers: { 'Eatery-API-Minor-Version': 1 },
      params: { placeId },
    });
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
};
