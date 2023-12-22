import React from "react";
import { useQuery } from "react-query";
import { membersApi } from "@/api/members";
import { useRouter } from "next/router";

const useGetProfile = () => {
  const { query } = useRouter();
  const memberId: any = query.id;

  const { data, isLoading, error, refetch } = useQuery(
    ["membersProfile", memberId],
    async () => {
      if (memberId) {
        const res = await membersApi.getProfile(memberId);
        return res;
      } else {
        const res = await membersApi.getMeProfile();
        return res;
      }
    },
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
    }
  );
  return { profileData: data, isLoadingProfile: isLoading, error, refetch };
};

export default useGetProfile;
