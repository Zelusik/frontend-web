import styled from "@emotion/styled";
import LogoSvg from "assets/logo.svg";
import SearchSvg from "assets/search_24.svg";

export default function LogoTitle() {
  return (
    <TitleWrapper>
      <MenuList>
        <LogoSvg />
        <SearchSvg />
      </MenuList>
    </TitleWrapper>
  );
}

const TitleWrapper = styled.div`
  width: 100%;
  height: 50px;
  padding: 0 20px;
  display: flex;
`;

const MenuList = styled.ul`
  width: 100%;
  margin: auto 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
