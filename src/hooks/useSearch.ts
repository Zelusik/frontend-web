import { changeLocation, changeType } from "reducer/slices/search/searchSlice";
import { useAppDispatch } from "./useReduxHooks";

const useSearch = () => {
  const dispatch = useAppDispatch();

  const locationSetting = (loc: any) => {
    dispatch(
      changeLocation({
        type: "search",
        value: loc,
      })
    );
  };

  const defaultSearch = () => {
    dispatch(
      changeType({
        type: "search",
        value: "default",
      })
    );
  };

  return { locationSetting, defaultSearch };
};

export default useSearch;
