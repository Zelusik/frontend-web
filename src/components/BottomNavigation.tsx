import React, { forwardRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { Icon } from "@/components";
import { globalValue } from "@/constants/globalValue";
import { Box, Flex, Space } from "@/components/core";

const navigationDatas = [
  { route: "/", en: "Home", val: "홈" },
  { route: "/map", en: "Map", val: "지도" },
  { route: "/review", en: "Review", val: "리뷰쓰기" },
  { route: "/mark", en: "Mark", val: "저장" },
  { route: "/mypage", en: "Mypage", val: "마이" },
];

export const BottomNavigation = forwardRef(function Div({}, ref: any) {
  const { pathname } = useRouter();

  return (
    <Box
      veiwportRef={ref}
      w="100%"
      maw={globalValue.MAX_WIDTH}
      h={globalValue.BOTTOM_NAVIGATION_HEIGHT}
      pos="fixed"
      bottom={0}
      shadow="0px -1px 5px rgba(0, 0, 0, 0.1)"
      bg="N0"
      style={{
        transition: `transform 300ms ease-out`,
      }}
    >
      <Space h={10} />
      <Flex justify="space-around">
        {navigationDatas?.map((data: any, idx: number) => {
          return (
            <Link href={data.route} key={idx}>
              <Flex
                dir="column"
                gap={8}
                text="center"
                align="center"
                c={pathname === data.route ? "Orange600" : "N100"}
                style={{ cursor: "pointer" }}
              >
                <Icon
                  icon={data.en}
                  fill={pathname === data.route ? "Orange500" : "N50"}
                />
                {data.val}
              </Flex>
            </Link>
          );
        })}
      </Flex>
    </Box>
  );
});
