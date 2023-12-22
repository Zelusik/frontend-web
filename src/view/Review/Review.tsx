import React, { useEffect, useState } from "react";
import * as exifr from "exifr";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import {
  changeImageInfo,
  initializeImageInfo,
} from "@/reducer/slices/image/imageSlice";
import { Route } from "@/constants/Route";
import { initializeReviewInfo } from "@/reducer/slices/review/reviewSlice";
import { BottomNavigation, Toast, Icon, Title } from "@/components";
import imageCompression from "browser-image-compression";
import { useToast, useDisplaySize } from "@/hooks";
import { globalValue, typography } from "@/constants";
import { Box, Flex, Space, Text } from "@/components/core";

const Review = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { height } = useDisplaySize();
  const { isShowToast, openToast, closeToast } = useToast();
  const [isMobile, setIsMobile] = useState(false);

  const handleCloseToast = () => {
    closeToast();
  };

  useEffect(() => {
    localStorage.removeItem("state");
    if (typeof document !== "undefined" && window.ReactNativeWebView) {
      const isCurrentMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          window.navigator.userAgent
        );

      setIsMobile(isCurrentMobile);

      if (isCurrentMobile) {
        window.ReactNativeWebView.postMessage("mobile");
      }
    }
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
      const convertedImgBlob = await convertHeicToJpeg(file);
      reader.readAsDataURL(convertedImgBlob);
      imageInfo.image = await imageConvert(convertedImgBlob);
      imageInfo.imageUrl = URL.createObjectURL(convertedImgBlob);
      const data = await exifr.parse(file);

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
    <>
      <Box h={height - globalValue.BOTTOM_NAVIGATION_HEIGHT}>
        <Title height={50} textCenter="리뷰쓰기" />
        <Space h={20} />
        <Flex ph={20} dir="column" gap={20}>
          <Text typo="Headline5">
            리뷰 작성을 위해
            <br />
            사진을 선택해주세요!
          </Text>
          <Flex
            w={160}
            h={114}
            justify="center"
            align="center"
            radius={12}
            bw={1}
            bc="N40"
          >
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="customButton">
                <Icon icon="Gallery" />
                <div style={typography.Headline2}>사진 추가하기</div>
              </div>
            </div>
          </Flex>
        </Flex>
        {isShowToast && (
          <Toast
            message={"최대 9장의 사진 선택이 가능합니다"}
            close={handleCloseToast}
          />
        )}
      </Box>
      <BottomNavigation />
    </>
  );
};

export default Review;
