import React, { useEffect } from "react";
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
import BottomNavigation from "components/BottomNavigation/BottomNavigation";
import Toast from "components/Toast/Toast";
import imageCompression from "browser-image-compression";
import useToast from "hooks/useToast";

const Review = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isShowToast, openToast, closeToast } = useToast();

  const handleCloseToast = () => {
    closeToast();
  };

  useEffect(() => {
    localStorage.removeItem("state");
  }, []);

  const isHeicOrHeif = (fileName: string): boolean => {
    const lowercasedName = fileName.toLowerCase();
    return lowercasedName.endsWith(".heic") || lowercasedName.endsWith(".heif");
  };

  const convertHeicToJpeg = async (file: any): Promise<any> => {
    const heic2any = (await import("heic2any")).default;
    try {
      if (isHeicOrHeif(file.name)) {
        const result = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.8,
        });
        alert(`Blob Size: ${result.size}, Blob Type: ${result.type}`);
        return result;
      }
      return file;
    } catch {
      return file;
    }
  };

  const compressLargeImage = async (file: any): Promise<any> => {
    if (file.size > 5 * 1024 * 1024) {
      return imageCompression(file, { maxSizeMB: 5 });
    }
    return file;
  };

  const imageConvert = async (file: any) => {
    const processedFile = await compressLargeImage(file);
    return imageCompression.getDataUrlFromFile(processedFile);
  };

  // 이미지 파일에서 메타데이터 추출
  const extractGPSInfo = async (file: File): Promise<void> => {
    dispatch(initializeImageInfo());
    dispatch(initializeReviewInfo());
    const imageInfo: any = {
      image: "",
      imageUrl: "",
      lat: "",
      lng: "",
    };
    try {
      const reader = new FileReader();
      alert(`File Type: ${file.type}, File Name: ${file.name}`);
      const convertedImgBlob = await convertHeicToJpeg(file);

      reader.readAsDataURL(convertedImgBlob);
      imageInfo.image = await imageConvert(convertedImgBlob);
      imageInfo.imageUrl = URL.createObjectURL(convertedImgBlob);
      const data = await exifr.parse(file);
      alert(JSON.stringify(data));

      if (data?.latitude || data?.longitude) {
        imageInfo.lat = data?.latitude;
        imageInfo.lng = data?.longitude;
      } else {
        imageInfo.lat = "";
        imageInfo.lng = "";
      }
    } catch (error) {
      imageInfo.lat = "";
      imageInfo.lng = "";
    }
    if (localStorage.getItem("point")) {
      const { lat, lng } = JSON.parse(localStorage.getItem("point") || "{}");
      imageInfo.lat = lat;
      imageInfo.lng = lng;
    }
    dispatch(changeImageInfo(imageInfo));
  };

  const onDrop = async (acceptedFiles: any) => {
    if (acceptedFiles.length === 0) {
      return;
    } else if (acceptedFiles.length > 9) {
      openToast();
    } else {
      const promises = acceptedFiles.map((file: any) => {
        if (file.type.includes("image")) {
          return extractGPSInfo(file);
        }
        return Promise.resolve();
      });
      await Promise.all(promises);
      router.push(Route.REVIEW_PLACE());
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: { "image/*": [".heic", ".heif"] },
  });

  return (
    <ReviewWrapper>
      <BackTitle type="white-dots" text="리뷰쓰기" />
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
      {isShowToast && (
        <Toast
          message={"최대 9장의 사진 선택이 가능합니다"}
          close={handleCloseToast}
        />
      )}
      <BottomNavigation />
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
