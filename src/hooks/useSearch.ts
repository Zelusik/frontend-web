import {
  changeDayOfWeek,
  changeFilterAction,
  changeFoodType,
  changeLocation,
  changeMood,
  changeNewDayOfWeek,
  changeNewFoodType,
  changeNewMood,
  changeType,
} from "reducer/slices/search/searchSlice";
import { useAppDispatch, useAppSelector } from "./useReduxHooks";

const useSearch = () => {
  const dispatch = useAppDispatch();
  const { foodType, newFoodType, dayOfWeek, newDayOfWeek, mood, newMood } =
    useAppSelector((state) => state.search);

  const typeSetting = (type: any) => {
    dispatch(
      changeType({
        type: "search",
        value: type,
      })
    );
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
  const foodTypeSetting = (val: any) => {
    dispatch(
      changeFoodType({
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

  const dayOfWeekSetting = (val: any) => {
    dispatch(
      changeDayOfWeek({
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

  const moodSetting = (val: any) => {
    dispatch(
      changeMood({
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
    newFoodTypeSetting("");

    dayOfWeekSetting([]);
    newDayOfWeekSetting([]);

    moodSetting("");
    newMoodSetting("");
  };

  return {
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
  };
};

export default useSearch;
