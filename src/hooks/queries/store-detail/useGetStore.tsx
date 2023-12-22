import { useInfiniteQuery, useQuery } from "react-query";
import { placesApi } from "@/api/places";
import { useAppSelector } from "@/hooks/useReduxHooks";
import { getReviews } from "@/api/reviews";
import { useState } from "react";

const useGetStore = async ({ kakaoId, placeId }: any) => {
  const { placeInfo } = useAppSelector((state) => state.search);
  const [id, setId] = useState(null);

  // 음식점 정보
  const getStoreInfo = async () => {
    if (kakaoId) {
      const isExistPlace = await placesApi.getExistence(kakaoId);
      if (isExistPlace && isExistPlace.existenceOfPlace) {
        const res = await placesApi.getPlaces(kakaoId);
        setId(res.id);
        return res;
      } else {
        const res = await placesApi.postPlaces(placeInfo);
        setId(res.id);
        return res;
      }
    } else {
      return await placesApi.getPlacesId(placeId);
    }
  };

  const newId = await getStoreInfo();

  return {};

  // const {
  //   data: storeInfoData,
  //   isLoading: isStoreInfoLoading,
  //   error,
  //   refetch,
  // } = useQuery(["search"], getStoreInfo, {
  //   staleTime: 1000 * 60 * 5,
  //   cacheTime: 1000 * 60 * 30,
  // });

  // // 리뷰 목록 조회
  // const getReviewsWithParams = ({ pageParam = 0 }) => {
  //   console.log("A");
  //   return getReviews({
  //     params: {
  //       placeId: placeId || id,
  //       page: pageParam,
  //       size: 10,
  //       embed: "WRITER",
  //     },
  //   });
  // };

  // const {
  //   data,
  //   fetchNextPage,
  //   hasNextPage,
  //   isLoading: isReviewsLoading,
  // } = useInfiniteQuery(["reviews", placeId], getReviewsWithParams, {
  //   enabled: Boolean(!isStoreInfoLoading && id),
  //   getNextPageParam: (lastPage) => {
  //     return lastPage.isLast ? undefined : lastPage.number + 1;
  //   },
  // });
  // const reviewDatas = data?.pages;
  // console.log("B");

  // return {
  //   storeInfoData,
  //   isStoreInfoLoading,
  //   error,
  //   refetch,
  //   reviewDatas,
  //   fetchNextPage,
  //   hasNextPage,
  //   isReviewsLoading,
  // };
};

export default useGetStore;

// import { useInfiniteQuery, useQuery } from "react-query";
// import { placesApi } from "@/api/places";
// import { useAppSelector } from "@/hooks/useReduxHooks";
// import { getReviews } from "@/api/reviews";
// import { useState } from "react";

// const useGetStore = ({ kakaoId, placeId }: any): any => {
//   const { placeInfo } = useAppSelector((state) => state.search);
//   const [id, setId] = useState(null);

//   // 음식점 정보
//   const getStoreInfo = async () => {
//     if (kakaoId) {
//       const isExistPlace = await placesApi.getExistence(kakaoId);
//       if (isExistPlace.existenceOfPlace) {
//         const res = await placesApi.getPlaces(kakaoId);
//         setId(res.id);
//         return res;
//       } else {
//         const res = await placesApi.postPlaces(placeInfo);
//         setId(res.id);
//         return res;
//       }
//     } else {
//       return await placesApi.getPlacesId(placeId);
//     }
//   };

//   const {
//     data: storeInfoData,
//     isLoading: isStoreInfoLoading,
//     error,
//     refetch,
//   } = useQuery(["search"], getStoreInfo, {
//     staleTime: 1000 * 60 * 5,
//     cacheTime: 1000 * 60 * 30,
//   });

//   // 리뷰 목록 조회
//   const getReviewsWithParams = ({ pageParam = 0 }) => {
//     console.log("A");
//     return getReviews({
//       params: {
//         placeId: placeId || id,
//         page: pageParam,
//         size: 10,
//         embed: "WRITER",
//       },
//     });
//   };

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isLoading: isReviewsLoading,
//   } = useInfiniteQuery(["reviews", placeId], getReviewsWithParams, {
//     enabled: Boolean(!isStoreInfoLoading && id),
//     getNextPageParam: (lastPage) => {
//       return lastPage.isLast ? undefined : lastPage.number + 1;
//     },
//   });
//   const reviewDatas = data?.pages;
//   console.log("B");

//   return {
//     storeInfoData,
//     isStoreInfoLoading,
//     error,
//     refetch,
//     reviewDatas,
//     fetchNextPage,
//     hasNextPage,
//     isReviewsLoading,
//   };
// };

// export default useGetStore;
