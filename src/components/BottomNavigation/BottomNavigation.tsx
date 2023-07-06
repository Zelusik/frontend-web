import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "@emotion/styled";

import HomeAct from "assets/BottomNavigation/home_act_28.svg";
import MapAct from "assets/BottomNavigation/map_act_28.svg";
import ReviewAct from "assets/BottomNavigation/review_act_28.svg";
import MarkAct from "assets/BottomNavigation/mark_act_28.svg";
import MypageAct from "assets/BottomNavigation/mypage_act_28.svg";

import HomeNone from "assets/BottomNavigation/home_none_28.svg";
import MapNone from "assets/BottomNavigation/map_none_28.svg";
import ReviewNone from "assets/BottomNavigation/review_none_28.svg";
import MarkNone from "assets/BottomNavigation/mark_none_28.svg";
import MypageNone from "assets/BottomNavigation/mypage_none_28.svg";
import { colors } from "constants/colors";
import Spacing from "components/Spacing";

const BottomNavigation = () => {
  const { pathname } = useRouter();

  return (
    <BottomNavigationWrapper>
      <Spacing size={10} />
      <MenuList>
        <Link href="/">
          <Menu clicked={pathname === "/" ? "true" : "false"}>
            {pathname === "/" ? <HomeAct /> : <HomeNone />}홈
          </Menu>
        </Link>
        <Link href="/map">
          <Menu clicked={pathname === "/map" ? "true" : "false"}>
            {pathname === "/map" ? <MapAct /> : <MapNone />}
            지도
          </Menu>
        </Link>
        <Link href="/review">
          <Menu clicked={pathname === "/review" ? "true" : "false"}>
            {pathname === "/review" ? <ReviewAct /> : <ReviewNone />}
            리뷰쓰기
          </Menu>
        </Link>
        <Link href="/mark">
          <Menu clicked={pathname === "/mark" ? "true" : "false"}>
            {pathname === "/mark" ? <MarkAct /> : <MarkNone />}
            저장
          </Menu>
        </Link>
        <Link href="/mypage">
          <Menu clicked={pathname === "/mypage" ? "true" : "false"}>
            {pathname === "/mypage" ? <MypageAct /> : <MypageNone />}
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
