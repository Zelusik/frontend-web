import React, { forwardRef, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
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

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const StyledTab = styled(Tab)({
  "&.Mui-selected": {
    color: "red",
  },
});

const TopNavigationTest2 = forwardRef(function Div(
  {
    children,
    type = "store-detail",
    index,
    scrollRef,
    scrollTop,
    titleList = [],
    ...props
  }: any,
  ref: any
) {
  const router = useRouter();
  const swiperRef = useRef<any>(null);

  const theme = createTheme({
    red: "#fff",
    palette: {
      primary: {
        light: "#fff",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
  });
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(props.currentIndex);
    }
  }, [props.currentIndex]);

  const onSlideChange = (e: any) => {
    // let newSwiper = e.activeIndex;
    // props.setCurrentIndex(newSwiper);
    // if (scrollRef.current?.scrollTop > scrollTop) {
    //   scrollRef.current!.scrollTop = scrollTop;
    // }
  };

  return (
    <>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor=""
          // indicatorColor="secondary"
          style={{
            width: 375,
          }}
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
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <SwipeableViews
        // axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
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
    </>
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
