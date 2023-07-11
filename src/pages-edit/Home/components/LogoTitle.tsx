import styled from "@emotion/styled";
import LogoSvg from "assets/logo.svg";
import Icon from "components/Icon";

export default function LogoTitle() {
  return (
    <TitleWrapper>
      <MenuList>
        <LogoSvg />
        <Icon
          icon="Search"
          width={24}
          height={24}
          onClick={() => {
            alert("search");
          }}
        />
      </MenuList>
    </TitleWrapper>
  );
}

const TitleWrapper = styled.div`
  width: 100%;
  height: 50px;
`;

const MenuList = styled.ul`
  width: 100%;
  margin: auto 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
