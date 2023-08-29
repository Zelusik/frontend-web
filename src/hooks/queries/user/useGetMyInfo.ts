import React from "react";
import { useQuery } from "react-query";
import { useAppDispatch } from "hooks/useReduxHooks";
import { changeUserInfo } from "reducer/slices/user/userSlice";
import { getMyInfo } from "api/members";

const useGetMyInfo = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, error, refetch } = useQuery(
    ["user"],
    async () => {
      const result = await getMyInfo();
      dispatch(
        changeUserInfo({
          type: "birthDay",
          value: result.birthDay,
        })
      );
      dispatch(
        changeUserInfo({
          type: "gender",
          value: result.gender,
        })
      );
      dispatch(
        changeUserInfo({
          type: "id",
          value: result.id,
        })
      );
      dispatch(
        changeUserInfo({
          type: "image",
          value: {
            url: result.profileImage.imageUrl,
            thumbnailUrl: result.profileImage.thumbnailImageUrl,
          },
        })
      );
      dispatch(
        changeUserInfo({
          type: "nickname",
          value: result.nickname,
        })
      );
      return result;
    },
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
    }
  );
  return { data, isLoading, error, refetch };
};

export default useGetMyInfo;
