import React from "react";
import { styled } from "styled-components";
import { ClickedHome, UnClickedHome } from "../Icon/HomeIcon";
import { ClickedMy, UnClickedMy } from "../Icon/MyIcon";
import { ClickedMark, UnClickedMark } from "../Icon/MarkIcon";
import { ClickedReview, UnClickedReview } from "../Icon/ReviewIcon";
import { ClickedMap, UnClickedMap } from "../Icon/MapIcon";
import { useRouter } from "next/router";
import Link from "next/link";

const BottomNavigation = () => {
  const { pathname } = useRouter();

  return (
    <BottomNavigationWrapper>
      <MenuList>
        <Link href="/">
          <Menu clicked={pathname === "/" ? "true" : "false"}>
            {pathname === "/" ? <ClickedHome /> : <UnClickedHome />}홈
          </Menu>
        </Link>
        <Link href="/map">
          <Menu clicked={pathname === "/map" ? "true" : "false"}>
            {pathname === "/map" ? <ClickedMap /> : <UnClickedMap />}
            지도
          </Menu>
        </Link>
        <Link href="/review">
          <Menu clicked={pathname === "/review" ? "true" : "false"}>
            {pathname === "/review" ? <ClickedReview /> : <UnClickedReview />}
            리뷰쓰기
          </Menu>
        </Link>
        <Link href="/store">
          <Menu clicked={pathname === "/store" ? "true" : "false"}>
            {pathname === "/store" ? <ClickedMark /> : <UnClickedMark />}
            저장
          </Menu>
        </Link>
        <Link href="/my">
          <Menu clicked={pathname === "/my" ? "true" : "false"}>
            {pathname === "/my" ? <ClickedMy /> : <UnClickedMy />}
            마이
          </Menu>
        </Link>
      </MenuList>
    </BottomNavigationWrapper>
  );
};

const BottomNavigationWrapper = styled.div`
  width: 100%;
  background-color: white;
  position: fixed;
  bottom: 0;
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
