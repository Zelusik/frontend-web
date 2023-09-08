import {
  changeDayOfWeek,
  changeFilterVisible,
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
  const { foodType, dayOfWeek, mood } = useAppSelector((state) => state.search);

  const handleSearchType = (type: any) => {
    dispatch(
      changeType({
        type: "search",
        value: type,
      })
    );
    if (type === "default") {
      handleSearchValue("");
      deleteSelection();
    }
  };
  const handleSearchValue = (val: any) => {
    dispatch(
      changeValue({
        type: "search",
        value: val,
      })
    );
  };
  const handleFilterVisible = (filterVisible: boolean) => {
    dispatch(
      changeFilterVisible({
        type: "search",
        value: filterVisible,
      })
    );
  };
  const handleLocation = (loc: any) => {
    dispatch(
      changeLocation({
        type: "search",
        value: loc,
      })
    );
  };

  const handleFoodType = (val: any) => {
    dispatch(
      changeFoodType({
        type: "search",
        value: val,
      })
    );
  };
  const handleNewFoodType = (val: any) => {
    dispatch(
      changeNewFoodType({
        type: "search",
        value: val,
      })
    );
  };

  const handleDayOfWeek = (val: any) => {
    dispatch(
      changeDayOfWeek({
        type: "search",
        value: val,
      })
    );
  };
  const handleNewDayOfWeek = (val: any) => {
    dispatch(
      changeNewDayOfWeek({
        type: "search",
        value: val,
      })
    );
  };

  const handleMood = (val: any) => {
    dispatch(
      changeMood({
        type: "search",
        value: val,
      })
    );
  };
  const handleNewMood = (val: any) => {
    dispatch(
      changeNewMood({
        type: "search",
        value: val,
      })
    );
  };

  const updateNewSelection = () => {
    handleNewFoodType(foodType);
    handleNewDayOfWeek(dayOfWeek);
    handleNewMood(mood);
  };

  const updateSelection = (
    pickFoodType: any,
    pickDayOfWeek: any,
    pickMood: any
  ) => {
    handleFoodType(pickFoodType);
    handleDayOfWeek(pickDayOfWeek);
    handleMood(pickMood);
  };

  const deleteSelection = () => {
    handleFoodType("");
    handleDayOfWeek([]);
    handleMood("");
  };

  //
  const handlePlaceInfo = (placeInfo: any) => {
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
    handleSearchType,
    handleSearchValue,
    handleFilterVisible,
    handleLocation,

    handleFoodType,
    handleNewFoodType,

    handleDayOfWeek,
    handleNewDayOfWeek,

    handleMood,
    handleNewMood,

    updateNewSelection,
    updateSelection,
    deleteSelection,

    handlePlaceInfo,
  };
};

export default useSearch;
