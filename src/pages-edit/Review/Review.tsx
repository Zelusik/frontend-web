import React from "react";
import styled from "@emotion/styled";
import Icon from "components/Icon/Icon";
import { colors } from "constants/colors";
import { typography } from "constants/typography";
import * as exifr from "exifr";
import { useAppDispatch } from "hooks/useReduxHooks";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import {
  changeImageInfo,
  initializeImageInfo,
} from "reducer/slices/image/imageSlice";
import { Route } from "constants/Route";
import BackTitle from "components/Title/BackTitle";
import { initializeReviewInfo } from "reducer/slices/review/reviewSlice";

const Review = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // 이미지 파일에서 메타데이터 추출
  const extractGPSInfo = async (file: File): Promise<void> => {
    dispatch(initializeImageInfo());
    dispatch(initializeReviewInfo());
    const imageInfo: { preview: string; lat: string; lng: string } = {
      preview: "",
      lat: "",
      lng: "",
    };
    try {
      const data: any = await exifr.parse(file);
      imageInfo.preview = URL.createObjectURL(file);

      const lat = data?.GPSLatitude;
      const lng = data?.GPSLongitude;

      imageInfo.lat = String(lat[0] + lat[1] / 60 + lat[2] / 3600);
      imageInfo.lng = String(lng[0] + lng[1] / 60 + lng[2] / 3600);
    } catch (error) {
      imageInfo.lat = "";
      imageInfo.lng = "";
      console.error("GPS 정보 추출 에러:", error);
    }
    dispatch(changeImageInfo(imageInfo));
  };

  const onDrop = (acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      if (file.type.includes("image")) {
        extractGPSInfo(file);
      }
    });

    router.push(Route.REVIEW_PLACE());
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: { "image/*": [] },
  });

  return (
    <ReviewWrapper>
      <BackTitle type="primary" text="리뷰쓰기" />
      <MainWrapper>
        <div style={typography.Headline5}>
          리뷰 작성을 위해
          <br />
          사진을 선택해주세요!
        </div>
        <InputWrapper>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className="customButton">
              <Icon icon="Gallery" />
              <div style={typography.Headline2}>사진 추가하기</div>
            </div>
          </div>
        </InputWrapper>
      </MainWrapper>
    </ReviewWrapper>
  );
};

const ReviewWrapper = styled.div``;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 160px;
  height: 114px;

  border-radius: 12px;
  border: 1px solid ${colors.N40};

  .customButton {
    display: flex;
    flex-direction: column;
    gap: 11px;

    align-items: center;
  }
`;
export default Review;
