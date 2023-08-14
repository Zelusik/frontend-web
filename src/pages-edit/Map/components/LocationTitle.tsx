import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Icon from "components/Icon";
import Text from "components/Text";

export default function LocationTitle() {
  const router = useRouter();

  return (
    <Wrapper>
      <Menu style={{ marginRight: 4 }}>
        <Icon icon="StoreMarker" width={16} height={16} />
      </Menu>
      <Text typo="Paragraph5" color="N100">
        광명시 광명동
      </Text>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 20px;
  padding: 0 15px;
  display: flex;
`;

const Menu = styled.div`
  margin: auto 0;
  display: flex;
`;
