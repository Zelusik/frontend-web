import { useRef } from "react";
import { ScrollArea, Space } from "@/components/core";
import LoadingCircle from "@/components/Loading/LoadingCircle";
import { useGetSearchLocation } from "@/hooks/queries/search-places/useGetSearch";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useAppSelector } from "@/hooks/useReduxHooks";
import NoneText from "./NoneText";
import Selection from "./Selection";

const LocationContainer = ({ currentIndex, keyword }: any) => {
  const infinityScrollRef = useRef<any>(null);
  const { display } = useAppSelector((state) => state.global);

  const { searchDatas, isLoading, fetchNextPage, hasNextPage } =
    useGetSearchLocation(currentIndex === 0, currentIndex, keyword);
  useIntersectionObserver(infinityScrollRef, fetchNextPage, !!hasNextPage, {});

  return (
    <ScrollArea scroll="y" h={display.height - 161} ph={20}>
      <Space h={20} />
      {searchDatas?.[0]?.contents && searchDatas?.[0]?.contents.length !== 0 ? (
        <>
          {searchDatas
            ?.flatMap((page_data: any) => page_data.contents)
            ?.map((data: any, idx: number) => {
              return (
                <Selection
                  key={idx}
                  type="location"
                  data={data}
                  keyword={keyword}
                />
              );
            })}
          <div ref={infinityScrollRef} />
          {hasNextPage && (
            <>
              <LoadingCircle height={30} />
              <Space h={30} />
            </>
          )}
        </>
      ) : (
        <NoneText text="지역" />
      )}
    </ScrollArea>
  );
};

export default LocationContainer;
