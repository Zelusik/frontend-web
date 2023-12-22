import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores";

// useDispatch는 thunkAction에 대해서 타입에러를 발생시키므로 커스터 마이징해서 사용
export const useAppDispatch: () => AppDispatch = useDispatch;
// useSelector를 사용할 경우, 매번 state의 타입을 지정해줘야 하기 때문에 커스터 마이징해서 사용
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
