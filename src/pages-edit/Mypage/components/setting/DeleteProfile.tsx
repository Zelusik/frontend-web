import React, { useState } from "react";
import styled from "@emotion/styled";
import BottomButton from "components/Button/BottomButton";
import Icon from "components/Icon/Icon";
import Spacing from "components/Spacing/Spacing";
import Text from "components/Text/Text";
import BackTitle from "components/Title/BackTitle";
import { colors } from "constants/colors";
import { typography } from "constants/typography";
import { deleteUser } from "api/user";
import { deleteCookie } from "utils/cookie";
import { useRouter } from "next/router";

const DeleteProfile = () => {
  const router = useRouter();

  const surveyList = [
    { value: "HARD_TO_WRITE", text: "스토리/탭탭리뷰를 작성하기가 어렵고 불편함" },
    { value: "FEED_UNUSEFUL", text: "피드의 추천이 유용하지 않음" },
    { value: "REVIEW_NOT_ENOUGH", text: "리뷰가 많지 않아 도움되지 않음" },
    { value: "NOT_MEET_EXPECTATION", text: "다운로드 시 기대한 내용과 앱이 다름" },
    { value: "NOT_TRUST", text: "서비스 운영의 신뢰도가 낮음" },
    { value: "ETC", text: "기타" },
  ];
  const [checked, setChecked] = useState("");

  const handleClickRadio = (value: string) => {
    setChecked(value);
  };
  const handleClickDeleteBtn = async () => {
    const result = await deleteUser(checked);

    if (!result.status) {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      router.push("/").then(() => window.scrollTo(0, 0));
    }
  };

  return (
    <DeleteProfileWrapper>
      <BackTitle type="black-left-text" text="회원탈퇴" />
      <Spacing size={20} />
      <Text typo="Headline3" color="N100">
        탈퇴 전 확인해 주세요.
      </Text>
      <Spacing size={22} />
      <Notification>
        회원 탈퇴 시 개인 정보 처리 방침에 따라 탈퇴 후에도 90일간 보관되며, 90일이
        지난 후에는 완전히 삭제됩니다.
      </Notification>
      <Spacing size={40} />
      <Text typo="Headline3" color="N100">
        탈퇴 사유를 알려주세요.
      </Text>
      <Spacing size={20} />
      <SurveyWrapper>
        {surveyList.map((servey: { value: string; text: string }) => (
          <SurveyButton
            key={servey.value}
            onClick={() => handleClickRadio(servey.value)}
          >
            <Icon
              icon={checked === servey.value ? "SelectedRadio" : "DefaultRadio"}
            />
            <Text typo="Paragraph4" color="N80">
              {servey.text}
            </Text>
          </SurveyButton>
        ))}
      </SurveyWrapper>
      <BottomWrapper>
        <BottomButton
          text="동의 및 탈퇴하기"
          radius={8}
          backgroundColor={checked ? colors.Orange500 : colors.Orange200}
          color={colors.N0}
          height="56px"
          disabled={checked ? false : true}
          onClick={handleClickDeleteBtn}
        />
      </BottomWrapper>
    </DeleteProfileWrapper>
  );
};

const DeleteProfileWrapper = styled.div`
  padding: 0 20px;
`;
const Notification = styled.div`
  position: relative;
  width: 100vw;
  left: 50%;
  transform: translateX(-50%);
  padding: 16px 21px;
  background-color: ${colors.N10};
  color: ${colors.N80} !important;
  ${typography.Paragraph1}
`;
const SurveyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const SurveyButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  position: absolute;
  bottom: 0;
  left: 20px;
  right: 20px;
  margin-bottom: 40px;
`;
export default DeleteProfile;
