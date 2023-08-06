import { editMyInfo } from "api/user";
import { useMutation, useQueryClient } from "react-query";

const useEditMyInfo = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(editMyInfo, {
    mutationKey: ["user"],
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });

  return { mutate };
};

export default useEditMyInfo;
