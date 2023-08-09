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

export default function Report() {
  const router = useRouter();
  const { type } = useAppSelector((state) => state.bottomSheet);

  const ReportDatas =
    type === "report-store"
      ? [
          { selected: true, text: "음식점의 위치" },
          { selected: false, text: "운영 시간" },
          { selected: false, text: "휴무일 정보" },
          { selected: false, text: "전화번호" },
          { selected: false, text: "sns 정보" },
          { selected: false, text: "기타" },
        ]
      : [
          { selected: true, text: "해당 음식점과 관련 없는 내용임" },
          { selected: false, text: "광고/홍보성 게시글임" },
          { selected: false, text: "선정적이거나 폭력, 혐오적임" },
          { selected: false, text: "무단 도용, 사칭, 저작권 침해가 의심됨" },
          { selected: false, text: "개인 정보 노출이 우려됨" },
          { selected: false, text: "기타" },
        ];

  const [selected, setSelected] = useState<boolean[]>(
    Array.from({ length: 6 }, () => false)
  );

  const handleClickReport = (idx: number) => {
    let newSelected = Array.from({ length: 6 }, (_) => false);
    newSelected[idx] = true;
    setSelected(newSelected);
  };

  return (
    <>
      <ReportWrapper>
        <BackTitle type="black-left-text" text="리뷰 신고하기" />
        <Spacing size={20} />
        <ReportTitle>이 리뷰를 신고하는 이유를 알려주세요.</ReportTitle>
        <Spacing size={20} />

        {ReportDatas.map((data: any, idx: number) => {
          return (
            <ReportButton
              key={idx}
              selected={selected[idx]}
              text={data.text}
              onClick={() => handleClickReport(idx)}
            />
          );
        })}
        <Spacing size={4} />

        <TextArea
          placeholder="신고 내용을 더 빠르게 해결할 수 있도록 추가 정보를 제공해주세요"
          size={112}
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
