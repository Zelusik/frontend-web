import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import useDisplaySize from "hooks/useDisplaySize";
import { globalValue } from "constants/globalValue";

import KakaoMap from "components/Share/KakaoMap";
import Spacing from "components/Spacing";
import Info from "components/Share/Info";
import Description from "components/Description";
import Hr from "components/Hr";
import { colors } from "constants/colors";
import BackTitle from "components/Title/BackTitle";
import StoreTitle from "components/Title/StoreTitle";
import Hashtags from "components/Hashtags";

import Profile from "./components/ProfileTime";
import ImageBox from "./components/ImageBox";
import ScaleUpButton from "./components/ScaleUpButton";
import { makeInfo } from "utils/makeInfo";
import useGetReviewsId from "hooks/queries/review-detail/useGetReviewsId";

export default function ReviewDetail() {
  const router = useRouter();
  const scrollRef = useRef<any>(null);
  const imageRef = useRef<any>(null);

  const { width, height } = useDisplaySize();
  const [mine, setMine] = useState<boolean>(false);
  const [titleChange, setTitleChange] = useState<boolean>(false);

  function onScroll() {
    if (scrollRef.current?.scrollTop >= window.innerWidth + 4 - 20) {
      setTitleChange(true);
    } else {
      setTitleChange(false);
    }
  }

  useEffect(() => {
    setMine(router.query.id === "1");
    scrollRef.current?.addEventListener("scroll", onScroll);
    return () => {
      scrollRef.current?.removeEventListener("scroll", onScroll);
    };
  }, []);

  const { data, isLoading } = useGetReviewsId(parseInt(router.query.id));
  console.log(data);

  return isLoading ? undefined : (
    <>
      <ImageBox ref={imageRef} images={data?.reviewImages} />
      <TitleWrapper visible={titleChange}>
        <BackTitle
          type={
            titleChange
              ? "black-left-text"
              : mine
              ? "white-dots-mine"
              : "white-dots"
          }
          title={titleChange ? data?.place?.name : undefined}
        />
      </TitleWrapper>

      <Wrapper ref={scrollRef} height={height}>
        <Spacing size={width + 4} />
        <ScrollWrapper>
          <Spacing size={20} />
          <StoreTitle
            type={mine ? "detail-mine" : "detail"}
            title={data?.place?.name}
            subTitle={`${data?.place?.category} · ${data?.place?.address?.sido} ${data?.place?.address?.sgg} ${data?.place?.address?.lotNumberAddress}`}
            editNone={true}
          />
          <Spacing size={16} />

          <Hashtags hashtags={data?.keywords} />

          <div style={{ padding: "0 20px" }}>
            <Spacing size={16} />
            <Description text={data?.content} />
            <Spacing size={15} />
            <Hr />
            <Spacing size={16} />
            <Profile data={data?.writer} />
            <Spacing size={16} />
          </div>

          <KakaoMapWrapper height={(width * 23) / 36}>
            <KakaoMap
              lat={data?.place?.point?.lat}
              lng={data?.place?.point?.lng}
            />
            <NoTouch />
            <ScaleUpButton
              lat={data?.place?.point?.lat}
              lng={data?.place?.point?.lng}
            />
          </KakaoMapWrapper>

          <div style={{ padding: "0 20px" }}>
            <Spacing size={40} />
            {makeInfo(data?.place).map((data: any, idx: number) => {
              return <Info key={idx} data={data} />;
            })}
          </div>
        </ScrollWrapper>
      </Wrapper>
    </>
  );
}

const fade = (visible: boolean) => keyframes`
  from {
    opacity: ${visible && 0};
    background-color: ${visible ? `transparent` : `${colors.N0}`};
  }
  to {
    opacity: ${visible && 1};
    background-color: ${visible ? `${colors.N0}` : `transparent`};
  }
`;

const TitleWrapper = styled.div<{ visible: boolean }>`
  width: 100%;
  max-width: ${globalValue.MAX_WIDTH}px;
  padding: 0 20px;

  position: fixed;
  top: 0;

  background-color: ${({ visible }) =>
    visible ? `${colors.N0}` : `transparents`};
  animation: ${(props) => fade(props.visible)} 0.3s forwards;
  z-index: 900;
`;

const Wrapper = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
  overflow-y: scroll;
  background-color: ${colors.N0};
`;

const ScrollWrapper = styled.div`
  position: relative;
  background-color: ${colors.N0};
`;

const KakaoMapWrapper = styled.div<{ height: number }>`
  width: 100%;
  height: ${({ height }) => height}px;
  overflow: hidden;
  position: relative;
`;

const NoTouch = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;

  background-color: transparent;
  z-index: 800;
`;
