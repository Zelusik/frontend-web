import React from "react";
import { useQuery } from "react-query";
import { getMembersProfile, getMyProfile } from "api/members";
import { useRouter } from "next/router";

const useGetMembersProfile = () => {
  const { query } = useRouter();
  const memberId: any = query.id;

  const { data, isLoading, error, refetch } = useQuery(
    ["membersProfile", memberId],
    async () => {
      if (memberId) {
        const res = await getMembersProfile(memberId);
        return res;
      } else {
        const res = await getMyProfile();
        return res;
      }
    },
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
    }
  );
  return { data, isLoading, error, refetch };
};

export default useGetMembersProfile;
