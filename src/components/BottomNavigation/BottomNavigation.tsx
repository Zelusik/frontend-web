import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "@emotion/styled";

import { colors } from "constants/colors";
import Spacing from "components/Spacing";
import Icon from "components/Icon";

const navigationDatas = [
  { route: "/", en: "Home", kr: "홈" },
  { route: "/map", en: "Map", kr: "지도" },
  { route: "/review", en: "Review", kr: "리뷰쓰기" },
  { route: "/mark", en: "Mark", kr: "저장" },
  { route: "/mypage", en: "Mypage", kr: "마이" },
];

const BottomNavigation = () => {
  const { pathname } = useRouter();

  return (
    <BottomNavigationWrapper>
      <Spacing size={10} />
      <MenuList>
        {navigationDatas.map((data: any, idx: number) => {
          return (
            <Link href={data.route} key={idx}>
              <Menu clicked={pathname === data.route ? "true" : "false"}>
                <Icon
                  icon={data.en}
                  fill={pathname === data.route ? colors.Orange500 : colors.N50}
                />
                {data.kr}
              </Menu>
            </Link>
          );
        })}
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
