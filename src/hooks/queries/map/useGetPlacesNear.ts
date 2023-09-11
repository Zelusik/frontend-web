import { useInfiniteQuery, QueryClient, useQueryClient } from "react-query";
import { useAppSelector } from "hooks/useReduxHooks";
import { getPlacesNear } from "api/places";
import {
  DAY_OF_WEEK_DATA,
  FOOD_KEYWORD,
  TASTE_KEYWORD,
} from "constants/globalData";
import useSearch from "hooks/useSearch";

const useGetPlacesNear = (openToast: any, isMarkShow: any): any => {
  const {
    filterVisible,

    foodType,
    dayOfWeek,
    mood,

    newFoodType,
    newDayOfWeek,
    newMood,

    location,
  } = useAppSelector((state) => state.search);
  const {
    handleFilterVisible,

    handleFoodType,
    handleDayOfWeek,
    handleMood,

    handleNewFoodType,
    handleNewDayOfWeek,
    handleNewMood,
  } = useSearch();

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["map", foodType, dayOfWeek, mood, location, isMarkShow],
    async ({ pageParam = 0 }) => {
      // const queryClient = new QueryClient();
      // const mapData = await useQueryClient.getQueryData(["map"]);
      // console.log(mapData);

      const params: any = {
        params: {
          daysOfWeek:
            dayOfWeek.length !== 0
              ? dayOfWeek.forEach((day: any) => DAY_OF_WEEK_DATA[day])
              : undefined,
          foodCategory: foodType && TASTE_KEYWORD[foodType],
          preferredVibe: mood && FOOD_KEYWORD[mood],
          onlyMarkedPlaces: isMarkShow,
          lat: location.lat,
          lng: location.lng,
          page: pageParam,
          size: 10,
        },
      };

      const result = await getPlacesNear(params);

      if (
        location.lat !== 0 &&
        location.lng !== 0 &&
        result?.totalElements === 0
      ) {
        handleFoodType(newFoodType);
        handleDayOfWeek(newDayOfWeek);
        handleMood(newMood);
        handleFilterVisible(filterVisible);
        openToast();
      } else {
        handleNewFoodType(foodType);
        handleNewDayOfWeek(dayOfWeek);
        handleNewMood(mood);
        handleFilterVisible(false);
      }

      return result;
    },
    {
      // keepPreviousData: true,
      staleTime: 0,
      cacheTime: 0,
      getNextPageParam: (lastPage: any) => {
        return lastPage?.isLast ? undefined : lastPage.number + 1;
      },
    }
  );
  const placeData = data?.pages;
  return { placeData, isLoading, fetchNextPage, hasNextPage };
};

export default useGetPlacesNear;
