import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Icon from "components/Icon";
import { typography } from "constants/typography";

export default function LocationTitle() {
  const router = useRouter();

  return (
    <TitleWrapper>
      <Menu style={{ marginRight: 4 }}>
        <Icon icon="StoreMarker" width={16} height={16} />
      </Menu>
      <Menu>
        <div style={typography.Paragraph5}>광명시 광명동</div>
      </Menu>
    </TitleWrapper>
  );
}

const TitleWrapper = styled.div`
  width: 100%;
  height: 20px;
  padding: 0 15px;
  display: flex;
`;

const Menu = styled.div`
  margin: auto 0;
  display: flex;
`;
