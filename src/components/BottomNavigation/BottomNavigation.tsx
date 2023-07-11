import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "@emotion/styled";

import { colors } from "constants/colors";
import Spacing from "components/Spacing";
import Icon from "components/Icon";

const BottomNavigation = () => {
  const { pathname } = useRouter();

  return (
    <BottomNavigationWrapper>
      <Spacing size={10} />
      <MenuList>
        <Link href="/">
          <Menu clicked={pathname === "/" ? "true" : "false"}>
            <Icon icon="Home" fill={pathname === "/" ? "#FF9E0C" : "#BDBEC7"} />
            홈
          </Menu>
        </Link>
        <Link href="/map">
          <Menu clicked={pathname === "/map" ? "true" : "false"}>
            <Icon
              icon="Map"
              fill={pathname === "/map" ? "#FF9E0C" : "#BDBEC7"}
            />
            지도
          </Menu>
        </Link>
        <Link href="/review">
          <Menu clicked={pathname === "/review" ? "true" : "false"}>
            <Icon
              icon="Review"
              fill={pathname === "/review" ? "#FF9E0C" : "#BDBEC7"}
            />
            리뷰쓰기
          </Menu>
        </Link>
        <Link href="/mark">
          <Menu clicked={pathname === "/mark" ? "true" : "false"}>
            <Icon
              icon="Mark"
              fill={pathname === "/mark" ? "#FF9E0C" : "#BDBEC7"}
            />
            저장
          </Menu>
        </Link>
        <Link href="/mypage">
          <Menu clicked={pathname === "/mypage" ? "true" : "false"}>
            <Icon
              icon="My"
              fill={pathname === "/mypage" ? "#FF9E0C" : "#BDBEC7"}
            />
            마이
          </Menu>
        </Link>
      </MenuList>
    </BottomNavigationWrapper>
  );
};

const BottomNavigationWrapper = styled.div`
  width: 100%;
  max-width: 820px;
  height: 88px;

  position: fixed;
  bottom: 0;
  box-shadow: 0px -1px 5px rgba(0, 0, 0, 0.1);
  background-color: ${colors.N0};
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Menu = styled.li<{ clicked: string }>`
  display: flex;
  flex-direction: column;
  gap: 8px;

  text-align: center;
  align-items: center;
  font-size: 12px;
  line-height: 24px;
  font-weight: 500;

  cursor: pointer;

  color: ${(props) => (props.clicked === "true" ? "#F59300" : "#343434")};
`;

export default BottomNavigation;
