import { useRef } from "react";
import { ScrollArea, Space } from "components/core";
import LoadingCircle from "components/Loading/LoadingCircle";
import { useGetSearchStore } from "hooks/queries/search-places/useGetSearch";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import { useAppSelector } from "hooks/useReduxHooks";
import NoneText from "./NoneText";
import Selection from "./Selection";

const StoreContainer = ({ currentIndex, keyword }: any) => {
  const infinityScrollRef = useRef<any>(null);
  const { display } = useAppSelector((state) => state.global);

  const { searchDatas, isLoading, fetchNextPage, hasNextPage } =
    useGetSearchStore(currentIndex === 1, currentIndex, keyword);
  useIntersectionObserver(infinityScrollRef, fetchNextPage, !!hasNextPage, {});

  return (
    <ScrollArea scroll="y" h={display.height - 161} ph={20}>
      <Space h={20} />
      {searchDatas?.[0]?.documents &&
      searchDatas?.[0]?.documents?.length !== 0 ? (
        <>
          {searchDatas
            ?.flatMap((page_data: any) => page_data.documents)
            ?.map((data: any, idx: number) => {
              return (
                <Selection
                  key={idx}
                  type="store"
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
        <NoneText text="음식점" />
      )}
    </ScrollArea>
  );
};

export default StoreContainer;
