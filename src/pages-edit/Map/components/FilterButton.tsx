import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { typography } from "constants/typography";
import { css } from "@emotion/react";
import { colors } from "constants/colors";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import { changeType } from "reducer/slices/search/searchSlice";
import { Route } from "constants/Route";
import Spacing from "components/Spacing";
import BottomButton from "components/Button/BottomButton";
import Gradient from "components/Share/Gradient";

export default function FilterButton({}: any) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleClickSelection = () => {
    dispatch(
      changeType({
        type: "search",
        value: "location",
      })
    );
    router.push(Route.MAP());
  };

  return (
    <>
      <Gradient size={30} />
      <FilterButtonWrapper onClick={handleClickSelection}>
        <div style={{ display: "flex", gap: 8 }}>
          <BottomButton type="default">초기화</BottomButton>
          <BottomButton type="primary" disabled={true}>
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
