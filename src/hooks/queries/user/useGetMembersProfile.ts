import React from "react";
import { useQuery } from "react-query";
import { getMembersProfile } from "api/members";
import { useRouter } from "next/router";

const useGetMembersProfile = () => {
  const { query } = useRouter();
  const memberId: any = query.id;

  const { data, isLoading, error, refetch } = useQuery(
    ["membersProfile"],
    async () => await getMembersProfile(memberId),
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      enabled: !!memberId,
    }
  );
  return { data, isLoading, error, refetch };
};

export default useGetMembersProfile;
