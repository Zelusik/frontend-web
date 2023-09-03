import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { typography } from "constants/typography";
import Spacing from "components/Spacing";
import BackTitle from "components/Title/BackTitle";
import BottomButton from "components/Button/BottomButton";
import ReportButton from "./components/ReportButton";
import { useState } from "react";
import TextArea from "components/TextArea";
import { useAppSelector } from "hooks/useReduxHooks";
import { reportData, storeReportData } from "constants/globalData";
import Text from "components/Text";

export default function Report() {
  const router = useRouter();
  const { type } = useAppSelector((state) => state.bottomSheet);

  const ReportDatas = type === "report-store" ? storeReportData : reportData;
  const [selected, setSelected] = useState<boolean[]>(
    Array.from({ length: 6 }, () => false)
  );

  const clickReport = (idx: number) => {
    let newSelected = Array.from({ length: 6 }, (_) => false);
    newSelected[idx] = true;
    setSelected(newSelected);
  };

  return (
    <>
      <ReportWrapper>
        <BackTitle type="black-left-text" text="리뷰 신고하기" />
        <Spacing size={20} />
        <Text typo="Headline3" color="N100">
          이 리뷰를 신고하는 이유를 알려주세요.
        </Text>
        <Spacing size={20} />

        {ReportDatas.map((data: any, idx: number) => {
          return (
            <ReportButton
              key={idx}
              selected={selected[idx]}
              text={data.val}
              onClick={() => clickReport(idx)}
            />
          );
        })}
        <Spacing size={4} />

        <TextArea
          size={114}
          placeholder="신고 내용을 더 빠르게 해결할 수 있도록 추가 정보를 제공해주세요"
          text="신고자 정보는 익명으로 처리되며, 신고된 포토리뷰는 검토 후 조치됩니다."
        />
      </ReportWrapper>
      <BottomReportWrapper>
        <BottomButton
          type="primary"
          text="신고하기"
          disabled={
            selected.filter((data) => {
              return !data;
            }).length === 6
          }
        />
      </BottomReportWrapper>
    </>
  );
}

const ReportWrapper = styled.div`
  height: 100%;
  padding: 0 20px;
`;

const ReportTitle = styled.div`
  ${css`
    ${typography.Headline3}
  `}
`;

const BottomReportWrapper = styled.div`
  width: 100%;
  padding: 0 20px;
  position: fixed;
  bottom: 42px;
`;
