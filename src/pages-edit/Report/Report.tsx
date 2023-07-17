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

export default function Report() {
  const router = useRouter();
  const [selected, setSelected] = useState<boolean[]>([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleClickReport = (idx: number) => {
    let newSelected = Array.from({ length: 6 }, (_) => false);
    newSelected[idx] = true;
    setSelected(newSelected);
  };

  return (
    <>
      <Wrapper>
        <BackTitle type="default" text="리뷰 신고하기" />
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
          size={112}
          text="신고자 정보는 익명으로 처리되며, 신고된 포토리뷰는 검토 후 조치됩니다."
        />
      </Wrapper>
      <BottomWrapper>
        <BottomButton type="primary" text="잇터리 시작하기" disabled={true} />
      </BottomWrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: 100%;
  padding: 0 20px;
`;

const ReportTitle = styled.div`
  ${css`
    ${typography.Headline3}
  `}
`;

const BottomWrapper = styled.div`
  width: 100%;
  padding: 0 20px;
  position: fixed;
  bottom: 42px;
`;

const ReportDatas = [
  { selected: true, text: "해당 음식점과 관련 없는 내용임" },
  { selected: false, text: "광고/홍보성 게시글임" },
  { selected: false, text: "선정적이거나 폭력, 혐오적임" },
  { selected: false, text: "무단 도용, 사칭, 저작권 침해가 의심됨" },
  { selected: false, text: "개인 정보 노출이 우려됨" },
  { selected: false, text: "기타" },
];
