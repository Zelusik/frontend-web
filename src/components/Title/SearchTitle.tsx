import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { colors } from "constants/colors";
import { globalValue } from "constants/globalValue";
import { Route } from "constants/Route";

import Icon from "components/Icon";
import Text from "components/Text";
import Spacing from "components/Spacing";

export default function SearchTitle({ type = "home", ...props }: any) {
  const router = useRouter();
  const clickSearch = () => {
    router.push(Route.SEARCH_PLACE());
  };

  return (
    <>
      <Spacing size={50} />
      <TitleWrapper>
        <MenuList>
          {type === "home" ? (
            <Icon icon="Logo" />
          ) : (
            <Text typo="Headline5" color="N100">
              저장한 음식점
            </Text>
          )}
          {/* <Icon icon="Search" width={24} height={24} onClick={clickSearch} /> */}
        </MenuList>
      </TitleWrapper>
    </>
  );
}

const TitleWrapper = styled.div`
  width: 100%;
  max-width: ${globalValue.MAX_WIDTH}px;
  height: 50px;
  padding: 0 15px;

  display: flex;
  position: fixed;
  top: 0;
  background-color: ${colors.N0};
  z-index: 900;
`;

const MenuList = styled.ul`
  width: 100%;
  margin: auto 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
