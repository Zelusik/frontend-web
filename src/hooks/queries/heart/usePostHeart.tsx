import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { postBookmarks } from 'api/bookmarks';
import { feedQueryKeys } from '../home/useGetFeed';
import { recommendReviewsQueryKeys } from '../mypage/useGetRecommendReviews';
import { Route } from 'constants/Route';

const usePostHeart = () => {
  const router = useRouter();
  const { query } = useRouter();
  const memberId: any = query.id;

  const queryClient = useQueryClient();
  return useMutation(async ({ id }: any) => await postBookmarks(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(feedQueryKeys.id);
      queryClient.invalidateQueries(recommendReviewsQueryKeys.byId(memberId));
    },
    onError: (error: any) => {
      router.replace({
        pathname: Route.ERROR(),
        query: { errorCode: error.status },
      });
    },
  });
};

export default usePostHeart;
