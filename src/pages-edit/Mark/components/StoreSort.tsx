import { useRouter } from "next/router";
import styled from "@emotion/styled";
import useAlert from "hooks/useAlert";
import { useAppSelector } from "hooks/useReduxHooks";

import { sortData } from "constants/globalData";
import Icon from "components/Icon";
import Text from "components/Text";

export default function StoreSort({}: any) {
  const router = useRouter();
  const { sortId } = useAppSelector((state) => state.alert);
  const { openAlert } = useAlert();

  return (
    <Wrapper onClick={() => openAlert("sort")}>
      <Text typo="Paragraph3" style={{ marginRight: 4 }}>
        {sortData[sortId - 1].val}
      </Text>
      <Menu>
        <Icon icon="BottomArrow" width={16} height={16} color="N60" />
      </Menu>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
`;

const Menu = styled.div`
  margin: auto 0;
  display: flex;
`;
