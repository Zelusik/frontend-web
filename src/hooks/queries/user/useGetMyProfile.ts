import React from "react";
import { useQuery } from "react-query";
import { getMyProfile } from "api/members";
import { useRouter } from "next/router";

const useGetMyProfile = () => {
  const { query } = useRouter();

  const { data, isLoading, error, refetch } = useQuery(
    ["myProfile"],
    async () => await getMyProfile(),
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      enabled: !query.id,
    }
  );
  return { data, isLoading, error, refetch };
};

export default useGetMyProfile;
