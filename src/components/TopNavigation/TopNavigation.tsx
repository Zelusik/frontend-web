import React, { forwardRef, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core";
import { Tab, Tabs } from "@mui/material";
import { Box, Text } from "@mantine/core";
import SwipeableViews from "react-swipeable-views";
import { colors } from "constants/colors";
import { useAppSelector } from "hooks/useReduxHooks";
import { typography } from "constants/typography";

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const TopNavigation = forwardRef(function Div(
  { height, padding, index, touch, keywordDatas, children }: any,
  ref: any
) {
  const router = useRouter();
  const { display } = useAppSelector((state) => state.global);

  const useStyles = makeStyles(() => ({
    tabsRoot: {
      minHeight: height,
      height: height,
    },
    tabRoot: {
      minHeight: height,
      height: height,
      padding: 0,
    },
  }));
  const classes = useStyles();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    index.setCurrentIndex(newValue);
  };
  const handleChangeIndex = (newIndex: number) => {
    index.setCurrentIndex(newIndex);
  };

  return (
    <Box w={display.width} pos="sticky" top={0}>
      <Tabs
        value={index.currentIndex}
        onChange={handleChange}
        TabIndicatorProps={{
          style: {
            borderBottom: `2px solid ${colors["Orange600"]}`,
          },
        }}
        style={{ margin: `0 ${padding}px` }}
        classes={{
          root: classes.tabsRoot,
        }}
      >
        <Tab
          label={
            <Text c={colors["Orange600"]} style={typography["Headline3"]}>
              추천 베스트
            </Text>
          }
          {...a11yProps(0)}
          classes={{
            root: classes.tabRoot,
          }}
          wrapped
        />
        <Tab
          label={
            <Text c={colors["Orange600"]} style={typography["Headline3"]}>
              리뷰
            </Text>
          }
          {...a11yProps(1)}
          classes={{
            root: classes.tabRoot,
          }}
          wrapped
        />
      </Tabs>

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
