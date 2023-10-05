import React, { forwardRef, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core";
import {
  Tab,
  Tabs,
  TabList,
  createTheme,
  useTheme,
  Typography,
  styled,
} from "@mui/material";
import { Box } from "@mantine/core";
import SwipeableViews from "react-swipeable-views";
import { colors } from "constants/colors";
import { useAppSelector } from "hooks/useReduxHooks";

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const tabHeight = "35px"; // default: '48px'
const useStyles = makeStyles((theme) => ({
  tabsRoot: {
    minHeight: tabHeight,
    height: tabHeight,
  },
  tabRoot: {
    minHeight: tabHeight,
    height: tabHeight,
    padding: 0,
  },
}));

const TopNavigationTest2 = forwardRef(function Div(
  { children, index, keywordDatas }: any,
  ref: any
) {
  const router = useRouter();
  const { display } = useAppSelector((state) => state.global);
  const classes = useStyles();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    index.setCurrentIndex(newValue);
  };
  const handleChangeIndex = (index: any) => {
    index.setCurrentIndex(index);
  };

  return (
    <Box pos="sticky" top={0}>
      <Tabs
        value={index.currentIndex}
        onChange={handleChange}
        textColor=""
        // indicatorColor="secondary"
        sx={{
          ".Mui-selected": {
            color: colors["Orange600"],
          },
        }}
        TabIndicatorProps={{
          style: {
            background: colors["Orange600"],
          },
        }}
        style={{ width: display.width }}
        classes={{
          root: classes.tabsRoot,
        }}
      >
        <Tab
          label="Item One"
          {...a11yProps(0)}
          style={{ height: "35px" }}
          classes={{
            root: classes.tabRoot,
          }}
        />
        <Tab
          label="Item Two"
          {...a11yProps(1)}
          style={{ height: "35px" }}
          classes={{
            root: classes.tabRoot,
          }}
        />
      </Tabs>

      <SwipeableViews
        // axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={index.currentIndex}
        onChangeIndex={handleChangeIndex}
      >
        {children}
        {/* <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel> */}
      </SwipeableViews>
    </Box>
  );
});

export default TopNavigationTest2;

// import React, { useState } from "react";
// import { Tab, Tabs, TabList, useTheme, Box, Typography } from "@mui/material";
// import SwipeableViews from "react-swipeable-views";

// const TopNavigationTest2Test2 = ({}: any) => {
//   const theme = useTheme();
//   const [value, setValue] = useState(0);

//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     setValue(newValue);
//   };
//   const handleChangeIndex = (index: number) => {
//     setValue(index);
//   };

//   return (
//     <>
//       <Tabs
//         value={value}
//         onChange={handleChange}
//         textColor="secondary"
//         indicatorColor="secondary"
//       >
//         <Tab label="Item One" {...a11yProps(0)} />
//         <Tab label="Item Two" {...a11yProps(1)} />
//         <Tab label="Item Three" {...a11yProps(2)} />
//       </Tabs>

//       <SwipeableViews
//         // axis={theme.direction === "rtl" ? "x-reverse" : "x"}
//         index={value}
//         onChangeIndex={handleChangeIndex}
//       >
//         <div>0</div>
//         <div>1</div>
//         <div>2</div>
//         {/* <TabPanel value={value} index={0}>
//           Item One
//         </TabPanel>
//         <TabPanel value={value} index={1}>
//           Item Two
//         </TabPanel>
//         <TabPanel value={value} index={2}>
//           Item Three
//         </TabPanel> */}
//       </SwipeableViews>
//     </>
//   );
// };
// export default TopNavigationTest2Test2;
