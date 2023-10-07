import React, { forwardRef, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { makeStyles, Typography } from "@material-ui/core";
import { Tab, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";

import { Box, Text, Divider } from "@mantine/core";
import SwipeableViews from "react-swipeable-views";
import { colors } from "constants/colors";
import { useAppSelector } from "hooks/useReduxHooks";
import { typography } from "constants/typography";

const useStyles = makeStyles({
  tabsRoot: {
    minHeight: (props: any) => props.height,
    height: (props: any) => props.height,
    padding: (props: any) => `0 ${props.padding}px`,
    // gap이 적용안됨
    // padding 적용도 안됨
    // scroll도 안됨
    ".MuiTabs-flexContainer": {
      gap: 24,
    },
  },
  tabRoot: {
    minWidth: "fit-content",
    minHeight: (props: any) => props.height,
    height: (props: any) => props.height,
    marginRight: (props: any) => props.gap,
    padding: 0,
  },
});

const StyledTab = styled(Tab)((props: any) => ({
  "&.Mui-selected": {
    color: colors[props.color],
  },
}));

const TopNavigation = forwardRef(function Div(
  {
    height,
    padding,
    gap,
    color = "N100",
    index,
    touch,
    keywordDatas,
    children,
  }: any,
  ref: any
) {
  const { display } = useAppSelector((state) => state.global);
  const classes = useStyles({ height, padding, gap });

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    index.setCurrentIndex(newValue);
  };
  const handleChangeIndex = (newIndex: number) => {
    index.setCurrentIndex(newIndex);
  };

  return (
    <Box w={display.width} pos="sticky" top={0}>
      <Tabs
        variant="scrollable"
        TabIndicatorProps={{
          style: {
            borderBottom: `2px solid ${colors[color]}`,
          },
        }}
        classes={{
          root: classes.tabsRoot,
        }}
        value={index.currentIndex}
        onChange={handleChange}
      >
        {keywordDatas?.map((keyword: string, idx: number) => {
          return (
            <StyledTab
              key={idx}
              color={color}
              label={
                <Text
                  c={colors[index.currentIndex === idx ? color : "N40"]}
                  style={{
                    ...typography["Headline3"],
                    display: "inline-block",
                  }}
                >
                  {keyword}
                </Text>
              }
              classes={{
                root: classes.tabRoot,
              }}
            />
          );
        })}
      </Tabs>
      <Divider color={colors["N20"]} style={{ margin: `0 ${padding}px` }} />

      <SwipeableViews
        index={index.currentIndex}
        onChangeIndex={handleChangeIndex}
        disabled={touch.touch && index.currentIndex === 0}
      >
        {children}
      </SwipeableViews>
    </Box>
  );
});

export default TopNavigation;
