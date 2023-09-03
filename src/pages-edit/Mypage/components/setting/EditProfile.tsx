import React from "react";
import styled from "@emotion/styled";
import BottomButton from "components/Button/BottomButton";
import RoundButton from "components/Button/RoundButton";
import Icon from "components/Icon/Icon";
import Image from "components/Image/Image";
import Spacing from "components/Spacing/Spacing";
import Text from "components/Text/Text";
import BackTitle from "components/Title/BackTitle";
import { colors } from "constants/colors";
import { typography } from "constants/typography";
import useGetMyInfo from "hooks/queries/user/useGetMyInfo";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import { changeUserInfo } from "reducer/slices/user/userSlice";
import useEditMyInfo from "hooks/queries/user/useEditMyInfo";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const { data } = useGetMyInfo();
  const { mutate } = useEditMyInfo();
  const user = useAppSelector((state) => state.user);
  let heic2any: any;

  if (typeof window !== "undefined") {
    import("heic2any").then((module) => {
      heic2any = module.default;
    });
  }

  const genderData = [
    { value: "FEMALE", text: "여성" },
    { value: "MALE", text: "남성" },
    { value: "ETC", text: "기타" },
  ];

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeUserInfo({
        type: "nickname",
        value: e.target.value,
      })
    );
  };
  const handleChangeBirthday = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeUserInfo({
        type: "birthDay",
        value: e.target.value,
      })
    );
  };
  const handleChangeGender = (gender: { value: string; text: string }) => {
    dispatch(
      changeUserInfo({
        type: "gender",
        value: gender.text,
      })
    );
  };
  const handleClickSaveBtn = () => {
    mutate({
      profileImage:
        data.profileImage.thumbnailImageUrl === user.image.thumbnailUrl
          ? ""
          : user.image.url,
      nickname: user.nickname,
      birthDay: user.birthDay,
      gender: genderData.filter((e) => e.text === user.gender)[0].value,
    });
  };

  const isHeicOrHeif = (fileName: string): boolean => {
    const lowercasedName = fileName.toLowerCase();
    return lowercasedName.endsWith(".heic") || lowercasedName.endsWith(".heif");
  };

  const convertHeicToJpeg = async (file: any): Promise<any> => {
    if (heic2any) {
      if (isHeicOrHeif(file.name)) {
        return heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.8,
        });
      }
      return file;
    }
    return file;
  };

  const compressLargeImage = async (file: any): Promise<any> => {
    if (file.size > 5 * 1024 * 1024) {
      return imageCompression(file, { maxSizeMB: 5 });
    }
    return file;
  };

  const imageConvert = async (file: any) => {
    let processedFile = await convertHeicToJpeg(file);
    processedFile = await compressLargeImage(processedFile);

    return imageCompression.getDataUrlFromFile(processedFile);
  };

  const onDrop = async (acceptedFiles: File[]): Promise<void> => {
    acceptedFiles.forEach(async (file) => {
      const reader = new FileReader();
      const convertedImgBlob = await convertHeicToJpeg(file);

      const image = await imageConvert(file);
      const imageUrl = URL.createObjectURL(convertedImgBlob);

      dispatch(
        changeUserInfo({
          type: "image",
          value: { url: image, thumbnailUrl: imageUrl },
        })
      );
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [".heic", ".heif"] },
  });

  return (
    <EditProfileWrapper>
      {data && (
        <>
          <BackTitle type="black-left-text" text="회원 정보 수정" />
          <ImageWrapper {...getRootProps()}>
            <input {...getInputProps()} />
            <Image
              alt="프로필 사진"
              src={user.image.thumbnailUrl}
              type="default"
              size={92}
            />
            <div className="icon-wrapper">
              <Icon icon="Camera" />
            </div>
          </ImageWrapper>
          <Spacing size={20} />
          <ProfileBox>
            <div className="section">
              <Text typo="Paragraph2" color="N100">
                이름/닉네임
                <span style={{ color: colors.Orange400 }}>*</span>
              </Text>
              <div className="input-box">
                <input
                  type="text"
                  maxLength={8}
                  value={user.nickname}
                  onChange={handleChangeNickname}
                />
                <Text typo="Paragraph2" color="N60">
                  {`${user.nickname.length}/8`}
                </Text>
              </div>
            </div>
            <div className="section">
              <Text typo="Paragraph2" color="N100">
                생년월일
              </Text>
              <div className="input-box">
                <input
                  type="date"
                  placeholder="생년월일을 선택해주세요"
                  required
                  value={user.birthDay}
                  onChange={handleChangeBirthday}
                />
                <Icon icon="Chevron" />
              </div>
            </div>
            <div className="section">
              <Text typo="Paragraph2" color="N100">
                성별
              </Text>
              <div className="gender-button">
                {genderData.map((gender: { value: string; text: string }) => (
                  <RoundButton
                    key={gender.value}
                    borderRadius="12px"
                    type="full"
                    action={user.gender === gender.text}
                    height={38}
                    onClick={() => handleChangeGender(gender)}
                  >
                    {gender.text}
                  </RoundButton>
                ))}
              </div>
            </div>
          </ProfileBox>
          <BottomWrapper>
            <BottomButton
              text="저장하기"
              radius={8}
              height="54px"
              onClick={handleClickSaveBtn}
              disabled={
                data.birthDay === user.birthDay &&
                data.nickname === user.nickname &&
                data.gender === user.gender &&
                data.profileImage.thumbnailImageUrl === user.image.thumbnailUrl
              }
            />
          </BottomWrapper>
        </>
      )}
    </EditProfileWrapper>
  );
};

const EditProfileWrapper = styled.div`
  padding: 0 20px;
  height: 100vh;
  overflow-y: scroll;
`;
const ImageWrapper = styled.div`
  position: relative;
  margin: 30px auto;
  width: fit-content;

  .icon-wrapper {
    position: absolute;
    right: -10px;
    bottom: 5px;
  }
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  .section {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .input-box {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      padding-bottom: 6px;
      border-bottom: 1px solid ${colors.N20};

      input {
        width: 100%;
        outline: none;
        border: none;
        ${typography.Paragraph6}
        color: ${colors.N80};

        ::placeholder {
          color: ${colors.N40};
        }
      }
      input[type="date"]::before {
        content: attr(placeholder);
        width: 100%;
        color: ${colors.N40};
      }
      input[type="date"]:focus::before,
      input[type="date"]:valid::before {
        display: none;
      }
    }
    .gender-button {
      display: flex;
      flex-direction: row;
      gap: 6px;
    }
  }
`;
const BottomWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 20px;
  right: 20px;
  margin-bottom: 40px;
`;

export default EditProfile;
