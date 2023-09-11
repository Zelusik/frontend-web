import { forwardRef, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { colors } from "constants/colors";
import useDisplaySize from "hooks/useDisplaySize";
import { useAppSelector } from "hooks/useReduxHooks";

import { globalValue } from "constants/globalValue";
import StoreSort from "pages-edit/Mark/components/StoreSort";
import LocationTitle from "./components/LocationTitle";
import Spacing from "components/Spacing";
import LoadingCircle from "components/Loading/LoadingCircle";
import StoreCard from "./components/StoreCard";

import {
  atmosphereKeyword,
  dayOfWeekData,
  tasteData,
} from "constants/globalData";
import Filter from "./components/filter/Filter";
import FilterSelection from "./components/filter/FilterSelection";

const MapBottomSheet = forwardRef(function Div(
  { children, sheet, content, filter, data, ...props }: any,
  ref: any
) {
  const infinityScrollRef = useRef<any>();
  const { height } = useDisplaySize();
  const { visible, actionDelay } = useAppSelector(
    (state) => state.mapBottomSheet
  );
  const {
    type,
    filterVisible,

    foodType,
    dayOfWeek,
    mood,
  } = useAppSelector((state) => state.search);

  const filterData = [
    {
      type: "full",
      text: "음식종류",
      textList: tasteData,
      original: foodType,
      new: filter?.pickFoodType,
      Fn: (val: any) => filter?.setPickFoodType(val),
    },
    {
      type: "full-radius",
      text: "약속요일",
      textList: dayOfWeekData,
      original: dayOfWeek,
      new: filter?.pickDayOfWeek,
      Fn: (val: any) => filter?.setPickDayOfWeek(val),
    },
    {
      type: "full",
      text: "선호하는 분위기",
      textList: atmosphereKeyword,
      original: mood,
      new: filter?.pickMood,
      Fn: (val: any) => filter?.setPickMood(val),
    },
  ];

  useEffect(() => {
    if (visible) {
      const BOTTOM_SHEET_HEIGHT =
        window.innerHeight - 82 - globalValue.BOTTOM_NAVIGATION_HEIGHT;
      const TOP = BOTTOM_SHEET_HEIGHT * 0.7;

      sheet.current!.style.setProperty("transform", `translateY(${-TOP}px)`);
      sheet.current!.style.setProperty("transition", `transform 0ms ease-out`);

      setTimeout(() => {
        sheet.current!.style.setProperty(
          "transition",
          `transform 300ms ease-out`
        );
      }, 100);
    }
  }, []);

  return (
    <>
      <Background visible={visible} />
      <BottomSheetWrapper
        ref={sheet}
        actionDelay={actionDelay}
        visible={visible}
        height={height - (82 + globalValue.BOTTOM_NAVIGATION_HEIGHT)}
      >
        <HandleWrapper>
          <Handle />
        </HandleWrapper>
        <BottomSheetContent ref={content}>
          {filterVisible ? (
            <>
              {filterData?.map((data: any, idx: number) => {
                return <Filter key={idx} type={data.type} data={data} />;
              })}
            </>
          ) : (
            <>
              {type === "store" ? (
                <StoreSort />
              ) : (
                <LocationTitle
                  type={type}
                  data={data?.placeData?.[0]?.totalElements}
                />
              )}
              <Spacing size={14} />
              {type === "location" ? <FilterSelection /> : null}
              {data?.isLoading || !props?.myLocation?.loaded ? (
                <LoadingCircle
                  size={
                    (height - 136 - globalValue.BOTTOM_NAVIGATION_HEIGHT) * 0.2
                  }
                />
              ) : (
                <>
                  {data?.placeData
                    ?.flatMap((page_data: any) => page_data?.contents)
                    ?.map((data: any, idx: number) => {
                      return (
                        ((props?.isMarkShow && data?.isMarked) ||
                          !props?.isMarkShow) && (
                          <StoreCard key={idx} data={data} />
                        )
                      );
                    })}
                  <div ref={infinityScrollRef} />
                  {data?.hasNextPage ? (
                    <>
                      <LoadingCircle size={30} />
                      <Spacing size={30} />
                    </>
                  ) : null}
                </>
              )}
            </>
          )}
        </BottomSheetContent>
      </BottomSheetWrapper>
    </>
  );
});

const Background = styled.div<{
  visible: number;
}>`
  width: 100%;
  height: 100%;

  display: ${({ visible }) => (visible !== 0 ? "flex" : "none")};
  position: absolute;
  top: 0;

  opacity: 0.4;

  ${({ visible }) =>
    visible === 0 || visible === 1
      ? css``
      : css`
          opacity: ${visible * 0.4};
        `}
  background-color: ${colors.N100};
`;

const BottomSheetWrapper = styled.div<{
  height: number;
  actionDelay: number;
  visible: number;
}>`
  width: 100%;
  max-width: ${globalValue.MAX_WIDTH}px;
  height: ${({ height }) => height}px;

  display: flex;
  flex-direction: column;

  position: fixed;
  top: ${({ height }) => `calc(82px + ${height * 0.7}px)`};

  border-radius: 16px 16px 0 0;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.12);
  color: ${({ color }) => color};
  background-color: ${colors.N0};

  transition: transform 300ms ease-out;
`;

const HandleWrapper = styled.div`
  width: 100%;
  display: flex;
`;
const Handle = styled.div`
  width: 36px;
  height: 4px;
  margin: 8px auto;

  border-radius: 2px;
  background-color: ${colors.N40};
`;

const BottomSheetContent = styled.div`
  overflow: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;

export default MapBottomSheet;
