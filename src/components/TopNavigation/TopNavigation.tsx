import React, { forwardRef, useEffect } from "react";
import { makeStyles, styled } from "@material-ui/core";
import { Tab, Tabs } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { useAppSelector } from "@/hooks/useReduxHooks";

import { colors } from "@/constants/colors";
import { Box, Divider, Text } from "@/components/core";

const useStyles = makeStyles({
  tabsRoot: {
    minHeight: (props: any) => props.height,
    height: (props: any) => props.height,
  },
  tabsScroller: {
    padding: (props: any) => `0 ${props.padding}px`,
  },
  tabsFlexContainer: {
    // width: (props: any) => 1000,
    // padding: (props: any) => `0 ${props.padding}px`,
    gap: (props: any) => props.gap,
  },

  tabRoot: {
    minWidth: "fit-content",
    minHeight: (props: any) => props.height,
    height: (props: any) => props.height,
    padding: 0,
    // marginRight: (props: any) => props.gap,
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
    gap = 24,
    color = "N100",
    index,
    touch,
    keywordDatas,
    top = 0,
    children,
  }: any,
  ref: any
) {
  const { display } = useAppSelector((state) => state.global);
  const classes = useStyles({
    width: display.width,
    height,
    padding,
    gap,
  });

  const handleChange = (_: React.SyntheticEvent, newIndex: number) => {
    index.setCurrentIndex(newIndex);
  };
  const handleChangeIndex = (newIndex: number) => {
    index.setCurrentIndex(newIndex);
  };

  return (
    <Box w={display.width} pos="sticky" top={top}>
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        TabIndicatorProps={{
          style: {
            borderBottom: `2px solid ${colors[color]}`,
          },
        }}
        classes={{
          root: classes.tabsRoot,
          scroller: classes.tabsScroller,
          flexContainer: classes.tabsFlexContainer,
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
                  c={index.currentIndex === idx ? color : "N40"}
                  typo="Headline3"
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
      <Divider h={1} mh={padding} bg="N20" />

      <SwipeableViews
        index={index.currentIndex}
        onChangeIndex={handleChangeIndex}
        disabled={touch.touch}
      >
        {children}
      </SwipeableViews>
    </Box>
  );
});

export default TopNavigation;
