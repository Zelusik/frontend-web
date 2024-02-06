import { editMyInfo } from 'api/members';
import { useMutation, useQueryClient } from 'react-query';

const useEditMyInfo = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(editMyInfo, {
    mutationKey: ['user'],
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
    },
  });

  return { mutate, isLoading };
};

export default useEditMyInfo;
