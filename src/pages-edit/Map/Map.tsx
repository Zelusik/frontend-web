import { useRouter } from "next/router";
import styled from "@emotion/styled";

import MapBottomSheet from "components/BottomSheet/MapBottomSheet";
import BottomNavigation from "components/BottomNavigation";
import Spacing from "components/Spacing";
import Input from "components/Input";

import Selections from "./components/Selections";
import FindLocationButton from "./components/FindLocationButton";
import StoreBox from "./components/StoreBox";
import LocationTitle from "./components/LocationTitle";
import KakaoMap from "components/KakaoMap";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import Filter from "./components/Filter";
import FilterSelection from "./components/FilterSelection";
import { commonWords } from "constants/commonWords";
import FilterButton from "./components/FilterButton";
import StoreFilter from "./components/StoreFilter";
import Icon from "components/Icon";
import { changeType } from "reducer/slices/search/searchSlice";

const filterSelection = [
  {
    type: "full",
    text: commonWords.foodType,
    textList: commonWords.foodTypeList,
  },
  {
    type: "full-radius",
    text: commonWords.dayOfWeek,
    textList: commonWords.dayOfWeekList,
  },
  {
    type: "full",
    text: commonWords.mood,
    textList: commonWords.moodList,
  },
];

export default function Map() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { action, filterAction } = useAppSelector((state) => state.search);
  const clickDelete = () => {
    dispatch(
      changeType({
        type: "search",
        value: "default",
      })
    );
  };

  return (
    <>
      <KakaoMapWrapper>
        <KakaoMap lat={33.450701} lng={126.570667} />
      </KakaoMapWrapper>
      <FindLocationButton />

      <MapBottomSheet>
        {filterAction ? (
          <>
            {filterSelection.map((data: any, idx: number) => {
              return (
                <FilterSelection
                  type={data.type}
                  text={data.text}
                  textList={data.textList}
                />
              );
            })}
          </>
        ) : (
          <>
            {action === "store" ? (
              <>
                <StoreFilter text="관련도순" />
                <Spacing size={14} />
              </>
            ) : (
              <>
                <LocationTitle />
                <Spacing size={14} />
                {action === "location" ? <Filter /> : null}
              </>
            )}

            {["", "", "", "", ""].map((data: any, idx: number) => {
              return <StoreBox key={idx} />;
            })}
          </>
        )}
      </MapBottomSheet>

      <HeaderWrapper>
        <Spacing size={16} />
        <InputWrapper>
          <Input placeholder="지역, 음식점, 닉네임 검색" />
        </InputWrapper>
        {action !== "default" ? (
          <IconWrapper>
            <Icon
              icon="CircleXButton"
              width={24}
              height={24}
              onClick={clickDelete}
            />
          </IconWrapper>
        ) : null}
        <Spacing size={8} />

        <Selections />
      </HeaderWrapper>

      {filterAction ? <FilterButton /> : <BottomNavigation />}
    </>
  );
}

const KakaoMapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 0;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const InputWrapper = styled.div`
  height: 52px;
  padding: 0 15px;
  display: flex;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 29px;
  // top: calc(50% - 18px);
  right: 27px;
`;
