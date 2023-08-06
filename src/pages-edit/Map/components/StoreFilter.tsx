import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Icon from "components/Icon";
import { sortData } from "constants/globalData";
import { typography } from "constants/typography";
import useAlert from "hooks/useAlert";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import { useRouter } from "next/router";
import { changeAlertVisible } from "reducer/slices/alert/alertSlice";

export default function StoreFilter({}: any) {
  const router = useRouter();
  const { sortId } = useAppSelector((state) => state.alert);
  const { openAlert } = useAlert();

  return (
    <StoreFilterWrapper onClick={() => openAlert("sort")}>
      <Menu style={{ marginRight: 4 }}>{sortData[sortId - 1].val}</Menu>
      <Menu>
        <Icon icon="BottomArrow" width={16} height={16} color="N60" />
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
