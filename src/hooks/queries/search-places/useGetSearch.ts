import { useInfiniteQuery } from "react-query";
import { getMeetingPlaces } from "api/meeting-places";
import { getKeyword } from "api/open-api";
import { getMembersSearch } from "api/members";

export const useGetSearchLocation = (
  isEnabled: boolean,
  currentIndex: number,
  keyword: any
): any => {
  const fetchSearch = async ({ pageParam = 0 }) => {
    if (keyword !== "") {
      const params: any = {
        params: {
          keyword: keyword,
          page: pageParam,
          size: 15,
        },
      };

      const result = await getMeetingPlaces(params);
      return result;
    }
  };

  const { data, isLoading, error, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery(["search", keyword], fetchSearch, {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      enabled: isEnabled,
      getNextPageParam: (lastPage: any) => {
        if (lastPage) {
          return lastPage.isLast ? undefined : lastPage.number + 1;
        } else {
          return undefined;
        }
      },
    });
  const searchDatas = data?.pages;
  return { searchDatas, isLoading, error, fetchNextPage, hasNextPage, refetch };
};

export const useGetSearchStore = (
  isEnabled: boolean,
  currentIndex: number,
  keyword: any
): any => {
  const fetchSearch = async ({ pageParam = 0 }) => {
    if (keyword !== "") {
      const params: any = {
        category_group_code: "FD6,CE7",
        query: keyword,
        page: pageParam + 1,
        size: 15,
      };

      const result = await getKeyword(params);
      return result;
    }
  };

  const { data, isLoading, error, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery(["search", currentIndex, keyword], fetchSearch, {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      enabled: isEnabled,
      getNextPageParam: (lastPage: any, allPages: any) => {
        if (lastPage) {
          return lastPage?.meta?.is_end ? undefined : allPages.length + 1;
        } else {
          return undefined;
        }
      },
    });
  const searchDatas = data?.pages;
  return { searchDatas, isLoading, error, fetchNextPage, hasNextPage, refetch };
};

export const useGetSearchProfile = (
  isEnabled: boolean,
  currentIndex: number,
  keyword: any
): any => {
  const fetchSearch = async ({ pageParam = 0 }) => {
    if (keyword !== "") {
      const params: any = {
        params: {
          keyword: keyword,
          page: pageParam,
          size: 15,
        },
      };

      const result = await getMembersSearch(params);
      return result;
    }
  };

  const { data, isLoading, error, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery(["search", currentIndex, keyword], fetchSearch, {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      enabled: isEnabled,
      getNextPageParam: (lastPage: any) => {
        return lastPage.isLast ? undefined : lastPage.number + 1;
      },
    });

  const searchDatas = data?.pages;
  return {
    searchDatas,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
  };
};

// const useGetSearch = (
//   isEnabled: boolean,
//   currentIndex: number,
//   keyword: any
// ): any => {
//   const fetchSearch = async ({ pageParam = 0 }) => {
//     if (keyword !== "") {
//       const params: any =
//         currentIndex === 1
//           ? {
//               category_group_code: "FD6,CE7",
//               query: keyword,
//               page: pageParam + 1,
//               size: 15,
//             }
//           : {
//               params: {
//                 keyword: keyword,
//                 page: pageParam,
//                 size: 15,
//               },
//             };

//       const result =
//         currentIndex === 0
//           ? await getMeetingPlaces(params)
//           : currentIndex === 1
//           ? await getKeyword(params)
//           : await getMembersSearch(params);

//       return result;
//     }
//   };

//   const { data, isLoading, error, fetchNextPage, hasNextPage, refetch } =
//     useInfiniteQuery(["search", currentIndex, keyword], fetchSearch, {
//       staleTime: 1000 * 60 * 5,
//       cacheTime: 1000 * 60 * 30,
//       enabled: isEnabled,
//       getNextPageParam: (lastPage: any, allPages: any) => {
//         if (lastPage) {
//           if (currentIndex === 1) {
//             return lastPage?.meta?.is_end ? undefined : allPages.length + 1;
//           } else return lastPage.isLast ? undefined : lastPage.number + 1;
//         } else {
//           return undefined;
//         }
//       },
//     });
//   const searchDatas = data?.pages;
//   return { searchDatas, isLoading, error, fetchNextPage, hasNextPage, refetch };
// };

// export default useGetSearch;
