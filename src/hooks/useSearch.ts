import {
  changeDayOfWeek,
  changeFilterAction,
  changeFoodType,
  changeLocation,
  changeMood,
  changeNewDayOfWeek,
  changeNewFoodType,
  changeNewMood,
  changePlaceInfo,
  changeType,
  changeValue,
} from "reducer/slices/search/searchSlice";
import { useAppDispatch, useAppSelector } from "./useReduxHooks";

const useSearch = () => {
  const dispatch = useAppDispatch();
  const { foodType, newFoodType, dayOfWeek, newDayOfWeek, mood, newMood } =
    useAppSelector((state) => state.search);

  const valueSetting = (val: any) => {
    dispatch(
      changeValue({
        type: "search",
        value: val,
      })
    );
  };

  const newFoodTypeSetting = (val: any) => {
    dispatch(
      changeNewFoodType({
        type: "search",
        value: val,
      })
    );
  };
  const foodTypeSetting = (val: any) => {
    newFoodTypeSetting(val);
    dispatch(
      changeFoodType({
        type: "search",
        value: val,
      })
    );
  };

  const newDayOfWeekSetting = (val: any) => {
    dispatch(
      changeNewDayOfWeek({
        type: "search",
        value: val,
      })
    );
  };
  const dayOfWeekSetting = (val: any) => {
    newDayOfWeekSetting(val);
    dispatch(
      changeDayOfWeek({
        type: "search",
        value: val,
      })
    );
  };

  const newMoodSetting = (val: any) => {
    dispatch(
      changeNewMood({
        type: "search",
        value: val,
      })
    );
  };
  const moodSetting = (val: any) => {
    newMoodSetting(val);
    dispatch(
      changeMood({
        type: "search",
        value: val,
      })
    );
  };

  const originalAll = () => {
    newFoodTypeSetting(foodType);
    newDayOfWeekSetting(dayOfWeek);
    newMoodSetting(mood);
  };

  const newAll = () => {
    foodTypeSetting(newFoodType);
    dayOfWeekSetting(newDayOfWeek);
    moodSetting(newMood);
  };

  const deleteAll = () => {
    foodTypeSetting("");
    dayOfWeekSetting([]);
    moodSetting("");
  };

  //
  const typeSetting = (type: any) => {
    dispatch(
      changeType({
        type: "search",
        value: type,
      })
    );
    if (type === "default") {
      valueSetting("");
      deleteAll();
    }
  };

  const locationSetting = (loc: any) => {
    dispatch(
      changeLocation({
        type: "search",
        value: loc,
      })
    );
  };

  const filterActionSetting = (filterAction: any) => {
    dispatch(
      changeFilterAction({
        type: "search",
        value: filterAction,
      })
    );
  };

  //
  const placeInfoSetting = (placeInfo: any) => {
    const newPlaceInfo = {
      kakaoPid: placeInfo.id,
      name: placeInfo.place_name,
      pageUrl: placeInfo.place_url,
      categoryName: placeInfo.category_name,
      categoryGroupCode: placeInfo.category_group_code,
      phone: placeInfo.phone,
      lotNumberAddress: placeInfo.address_name,
      roadAddress: placeInfo.road_address_name,
      lat: placeInfo.y,
      lng: placeInfo.x,
    };
    dispatch(
      changePlaceInfo({
        type: "search",
        value: newPlaceInfo,
      })
    );
  };

  return {
    valueSetting,

    typeSetting,
    locationSetting,
    filterActionSetting,

    foodTypeSetting,
    newFoodTypeSetting,

    dayOfWeekSetting,
    newDayOfWeekSetting,

    moodSetting,
    newMoodSetting,

    originalAll,
    newAll,
    deleteAll,

    placeInfoSetting,
  };
};

export default useSearch;
