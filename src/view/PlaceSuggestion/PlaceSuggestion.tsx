import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { typography } from 'constants/typography';

import BackTitle from 'components/Title/BackTitle';
import BottomButton from 'components/Button/BottomButton';

import { useState } from 'react';
import TextArea from 'components/TextArea';
import { useAppSelector } from 'hooks/useReduxHooks';
import { placeSuggestionData } from 'constants/globalData';
import { Space } from 'components/core';
import ReportButton from 'view/Report/components/ReportButton';

export default function Report() {
  const router = useRouter();
  const { type } = useAppSelector((state) => state.bottomSheet);

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
        <BackTitle type="black-left-text" text="정보 수정 제안하기" />
        <Space h={20} />

        {placeSuggestionData?.map((data: any, idx: number) => {
          return (
            <ReportButton
              key={idx}
              selected={selected[idx]}
              text={data.val}
              onClick={() => clickReport(idx)}
            />
          );
        })}
        <Space h={4} />

        <TextArea
          size={114}
          placeholder=""
          text="제안자 정보는 익명으로 처리되며, 제안 검토 후 조치됩니다."
        />
      </ReportWrapper>
      <BottomReportWrapper>
        <BottomButton
          type="primary"
          text="제안하기"
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
