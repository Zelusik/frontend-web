/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

import useDisplaySize from "hooks/useDisplaySize";
import useGetProfile from "hooks/queries/user/useGetProfile";
import useGetRecommendReviews from "hooks/queries/mypage/useGetRecommendReviews";
import { useAppDispatch } from "hooks/useReduxHooks";
import { editDisplaySize } from "reducer/slices/global/globalSlice";

import { globalValue } from "constants/globalValue";

import { Box, Space, ScrollArea } from "components/core";
import BottomNavigation from "components/BottomNavigation";
import Setting from "components/Button/IconButton/Setting";
import LoadingCircle from "components/Loading/LoadingCircle";
import { TopNavigation } from "components/TopNavigation";
import Title from "components/Title";
import Dots from "components/Button/IconButton/Dots";
import BackArrow from "components/Button/IconButton/BackArrow";

import TasteBox from "./components/TasteBox";
import ProfileInfo from "./components/ProfileInfo";
import RecommendReviewCardContainer from "./components/RecommendReviewCardContainer";
import ReviewCardContainer from "./components/ReviewCardContainer";
import { ScrollTopNavigation } from "components/TopNavigation";

// 392 + 35 = 427

const Mypage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { width, height } = useDisplaySize();
  dispatch(
    editDisplaySize({
      type: "display",
      value: [width, height],
    })
  );

  const scrollRef = useRef<any>(null);
  const scrollRef1 = useRef<any>(null);
  const scrollRef2 = useRef<any>(null);

  const [mine, setMine] = useState<any>(null);
  const [titleChange, setTitleChange] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [touch, setTouch] = useState(false);
  const [direction, setDirection] = useState("none");
  const [startY, setStartY] = useState([0, 0, 0]);

  //
  const { profileData, isLoadingProfile } = useGetProfile();
  const { recommendReviewDatas } = useGetRecommendReviews();

  useEffect(() => {
    const query = router.query.id;
    setMine(query ? profileData?.isEqualLoginMember : true);
  }, [currentIndex, profileData, recommendReviewDatas]);

  useEffect(() => {
    if (profileData && recommendReviewDatas) {
      setCurrentIndex(
        profileData?.isEqualLoginMember || recommendReviewDatas?.length !== 0
          ? 0
          : 1
      );
    }
  }, [profileData, recommendReviewDatas]);

  return (
    <>
      {isLoadingProfile ? (
        // <LoadingCircle
        //   height={mine ? height - globalValue.BOTTOM_NAVIGATION_HEIGHT : height}
        // />
        <></>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ScrollTopNavigation
            refs={[scrollRef, scrollRef1, scrollRef2]}
            index={{ currentIndex, setCurrentIndex }}
            Y={{ startY, setStartY }}
            direction={{ direction, setDirection }}
            title={{ titleChange, setTitleChange }}
            bottomHeight={
              50 + (mine ? globalValue.BOTTOM_NAVIGATION_HEIGHT : 0)
            }
          >
            {/* 332 */}
            <Box w={width} ph={20} bg="N0">
              <ProfileInfo mine={mine} profileData={profileData} />
              <Space h={22} />
              <TasteBox profileData={profileData?.tasteStatistics} />
              <Space h={40} />
            </Box>

            <TopNavigation
              height={34}
              padding={20}
              gap={24}
              color="N100"
              index={{
                currentIndex,
                setCurrentIndex,
              }}
              touch={{ touch, setTouch }}
              keywordDatas={["추천 베스트", "리뷰"]}
            >
              <RecommendReviewCardContainer
                refs={[scrollRef, scrollRef1]}
                mine={mine}
                direction={direction}
                touch={{ touch, setTouch }}
              />
              <ReviewCardContainer
                refs={[scrollRef, scrollRef2]}
                mine={mine}
                direction={direction}
              />
            </TopNavigation>
          </ScrollTopNavigation>
        </motion.div>
      )}
      <Title
        height={50}
        padding={20}
        renderLeft={
          !mine && (
            <>
              <BackArrow size={24} color="N100" />
              <Space w={6} />
            </>
          )
        }
        textLeft={titleChange > 10 ? profileData?.nickname : null}
        renderRight={
          mine ? <Setting size={24} /> : <Dots type="share-report" size={20} />
        }
      />
      {mine && <BottomNavigation />}
    </>
  );
};

export default Mypage;
