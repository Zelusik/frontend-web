import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Icon from "components/Icon";
import { colors } from "constants/colors";
import { commonWords } from "constants/commonWords";
import { typography } from "constants/typography";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import { useRouter } from "next/router";
import { changeAlertVisible } from "reducer/slices/alert/alertSlice";

export default function StoreFilter({}: any) {
  const router = useRouter();
  const { language } = useAppSelector((state) => state.global);
  const { sortId } = useAppSelector((state) => state.alert);
  const dispatch = useAppDispatch();
  const clickStoreFilter = () => {
    dispatch(
      changeAlertVisible({
        type: "alert",
        value: [true, "sort"],
      })
    );
  };

  return (
    <StoreFilterWrapper onClick={clickStoreFilter}>
      <Menu style={{ marginRight: 4 }}>
        {commonWords.alertSort[sortId - 1][language]}
      </Menu>
      <Menu>
        <Icon icon="BottomArrow" width={16} height={16} color={colors.N60} />
      </Menu>
    </StoreFilterWrapper>
  );
}

const StoreFilterWrapper = styled.div`
  padding: 0 15px;
  display: flex;
  ${css`
    ${typography.Paragraph5}
  `}
`;

const Menu = styled.div`
  margin: auto 0;
  display: flex;
`;
