/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

import useIntersectionObserver from 'hooks/useIntersectionObserver';
import useDisplaySize from 'hooks/useDisplaySize';
import { useAppDispatch } from 'hooks/useReduxHooks';
import { editDisplaySize } from 'reducer/slices/global/globalSlice';

import { colors } from 'constants/colors';
import LoadingCircle from 'components/Loading/LoadingCircle';
import { Box, ScrollArea, Space } from 'components/core';
import Hashtags from 'components/Hashtags/Hashtags';
import StoreTitle from 'components/Title/StoreTitle';
import ImageBox from './components/ImageBox';
import Title from 'components/Title';
import BackArrow from 'components/Button/IconButton/BackArrow';
import Setting from 'components/Button/IconButton/Setting';
import Dots from 'components/Button/IconButton/Dots';
import StoreReviewButton from 'components/Button/StoreReviewButton';
import Heart from 'components/Button/IconButton/Heart';
import Edit from 'components/Button/IconButton/Edit';
import Hashtag from 'components/Hashtags/Hashtag';
import { ScrollTopNavigation, TopNavigation } from 'components/TopNavigation';
import ReviewCardContainer from './components/ReviewCardContainer';
import StoreInfoContainer from './components/StoreInfoContainer';
import { globalValue } from 'constants/globalValue';
import { makeAddress } from 'utils/makeAddress';
import useGetStoreInfo from 'hooks/queries/store-detail/useGetStoreInfo';
import useGetReviews from 'hooks/queries/store-detail/useGetReviews';
import { setPlaceId } from 'reducer/slices/review/reportPlaceSlice';

const StoreDetail = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const scrollRef = useRef<any>(null);
  const scrollRef1 = useRef<any>(null);
  const scrollRef2 = useRef<any>(null);
  const infinityScrollRef = useRef<any>(null);

  const imageRef = useRef<any>(null);
  const { width, height } = useDisplaySize();
  dispatch(
    editDisplaySize({
      type: 'display',
      value: [width, height],
    })
  );

  const [titleChange, setTitleChange] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [touch, setTouch] = useState<boolean>(false);
  const [direction, setDirection] = useState('none');
  const [startY, setStartY] = useState([0, 0, 0]);

  const { storeInfoData, isStoreInfoLoading } = useGetStoreInfo({
    kakaoId: router.query.kakaoId,
    placeId: Number(router.query.id),
  });

  const { reviewDatas, fetchNextPage, hasNextPage } = useGetReviews({
    currentIndex,
    kakaoId: router.query.kakaoId,
    placeId: Number(router.query.id),
  });
  useIntersectionObserver(infinityScrollRef, fetchNextPage, !!hasNextPage, {});

  const imageHeight = (width * 281) / 360 + 10;

  return (
    <>
      <Title
        height={50}
        padding={20}
        position="absolute"
        top={0}
        background={titleChange - ((width * 281) / 360 - 50) > 0 && 'N0'}
        zIndex={802}
        renderLeft={
          <BackArrow
            color={
              storeInfoData?.placeImages?.length > 0 &&
              titleChange - ((width * 281) / 360 - 50) <= 0
                ? 'N0'
                : 'N100'
            }
          />
        }
        paddingLeft={8}
        textLeft={
          titleChange - ((width * 281) / 360 - 50) > 0 && storeInfoData?.name
        }
        renderRight={
          <Dots
            type="report-store"
            color={
              storeInfoData?.placeImages?.length > 0 &&
              titleChange - ((width * 281) / 360 - 50) <= 0
                ? 'N0'
                : 'N100'
            }
            onClick={() => dispatch(setPlaceId(Number(router.query.id)))}
          />
        }
      />
      {isStoreInfoLoading ? (
        <LoadingCircle height={height - 50} />
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
            scrollTop={imageHeight - 40}
            scroll={(storeInfoData?.placeImages?.length > 0 ? imageHeight : 0) + 155}
            top={0}
            bottomHeight={0}
          >
            {/* width * 281 / 360 */}
            <ImageBox ref={imageRef} images={storeInfoData?.placeImages} />
            {/* 155 */}
            <Space h={10} />
            <Title
              height={49}
              padding={20}
              renderLeft={
                <StoreReviewButton
                  type="none"
                  id={1}
                  name={storeInfoData?.name}
                  category={
                    storeInfoData?.category
                      ? `${
                          storeInfoData?.category
                            ? storeInfoData?.category + ' . '
                            : ''
                        }${makeAddress(storeInfoData?.address)}`
                      : ''
                  }
                  color="N100"
                  nameTypo="Headline6"
                  categoryTypo="Paragraph4"
                />
              }
              buttonRight={<Edit size={28} />}
              paddingRight={16}
              renderRight={
                <Heart id={storeInfoData?.id} isMarked={storeInfoData?.isMarked} />
              }
            />
            <Space h={16} />
            <Hashtags
              padding={20}
              textColor="N100"
              hashtagTextDatas={storeInfoData?.top3Keywords}
            />
            <Space h={40} />

            <TopNavigation
              height={34}
              padding={20}
              gap={24}
              top={50}
              color="N100"
              index={{
                currentIndex,
                setCurrentIndex,
              }}
              touch={{ touch, setTouch }}
              keywordDatas={['리뷰', '매장정보']}
            >
              <ReviewCardContainer
                refs={[scrollRef, scrollRef1]}
                direction={direction}
                touch={{ touch, setTouch }}
                imageSize={storeInfoData?.placeImages?.length > 0 ? imageHeight : 0}
                data={reviewDatas}
                hasNextPage={hasNextPage}
              />
              <StoreInfoContainer
                refs={[scrollRef, scrollRef2]}
                direction={direction}
                imageSize={storeInfoData?.placeImages?.length > 0 ? imageHeight : 0}
                data={storeInfoData}
              />
            </TopNavigation>
          </ScrollTopNavigation>
        </motion.div>
      )}
    </>
  );
};

export default StoreDetail;
