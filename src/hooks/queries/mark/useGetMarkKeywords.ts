import { getMarkKeywords } from "api/places";
import { useQuery } from "react-query";

const useGetMarkKeywords = () => {
  const {
    data: keywordData,
    isLoading,
    error,
  } = useQuery(["markKeywords"], async () => await getMarkKeywords(), {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
  return { keywordData, isLoading, error };
};

export default useGetMarkKeywords;
