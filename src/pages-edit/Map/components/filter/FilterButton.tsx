import { useRouter } from "next/router";
import styled from "@emotion/styled";
import useSearch from "hooks/useSearch";

import { colors } from "constants/colors";
import { Route } from "constants/Route";
import Spacing from "components/Spacing";
import BottomButton from "components/Button/BottomButton";
import Gradient from "components/Share/Gradient";
import { useAppSelector } from "hooks/useReduxHooks";
import { equals } from "utils/equals";

export default function FilterButton({ filter }: any) {
  const router = useRouter();
  const { foodType, newFoodType, dayOfWeek, newDayOfWeek, mood, newMood } =
    useAppSelector((state) => state.search);
  const { typeSetting, filterActionSetting, deleteAll, newAll } = useSearch();

  const handleClickSelection = () => {
    typeSetting("location");
    router.push(Route.MAP());
  };

  return (
    <>
      <Gradient size={30} />
      <FilterButtonWrapper onClick={handleClickSelection}>
        <div style={{ display: "flex", gap: 8 }}>
          <BottomButton
            type="default"
            disabled={false}
            onClick={() => {
              filterActionSetting(false);
              deleteAll();
            }}
          >
            초기화
          </BottomButton>
          <BottomButton
            type="primary"
            disabled={
              foodType === filter.pickFoodType &&
              equals(dayOfWeek, filter.pickDayOfWeek) &&
              mood === filter.pickMood
            }
            onClick={() => {
              // filterActionSetting(false);
              newAll(
                filter.pickFoodType,
                filter.pickDayOfWeek,
                filter.pickMood
              );
            }}
          >
            확인
          </BottomButton>
        </div>
        <Spacing size={40} />
      </FilterButtonWrapper>
    </>
  );
}

const FilterButtonWrapper = styled.div`
  width: 100%;
  padding: 0 17.5px;

  gap: 8px;
  position: fixed;
  bottom: 0;

  background-color: ${colors.N0};
  z-index: 800;
`;
