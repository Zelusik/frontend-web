import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { typography } from 'constants/typography';

import BackTitle from 'components/Title/BackTitle';
import BottomButton from 'components/Button/BottomButton';
import ReportButton from './components/ReportButton';
import { useState } from 'react';
import TextArea from 'components/TextArea';
import { useAppSelector } from 'hooks/useReduxHooks';
import { reportData, storeReportData } from 'constants/globalData';
import Text from 'components/core/Text';
import { Space } from 'components/core';
import { reportReview } from 'api/review-report';

export default function Report() {
  const router = useRouter();

  const { type } = useAppSelector((state) => state.bottomSheet);
  const { reviewId } = useAppSelector((state) => state.reportReview);

  const ReportDatas = type === 'report-store' ? storeReportData : reportData;
  const [selected, setSelected] = useState<boolean[]>(
    Array.from({ length: 6 }, () => false)
  );
  const [reasonDetail, setReasonDetail] = useState('');

  const clickReport = (idx: number) => {
    let newSelected = Array.from({ length: 6 }, (_) => false);
    newSelected[idx] = true;
    setSelected(newSelected);
  };

  const handleClickReport = async () => {
    const reportResult = await reportReview({
      reviewId,
      reasonOption: ReportDatas[selected.indexOf(true)].key,
      reasonDetail,
    });
    if (reportResult.id) {
      router.back();
    }
  };

  return (
    <>
      <ReportWrapper>
        <BackTitle type="black-left-text" text="리뷰 신고하기" />
        <Space h={20} />
        <Text typo="Headline3" c="N100">
          이 리뷰를 신고하는 이유를 알려주세요.
        </Text>
        <Space h={20} />

        {ReportDatas?.map((data: any, idx: number) => {
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
          placeholder="신고 내용을 더 빠르게 해결할 수 있도록 추가 정보를 제공해주세요"
          text="신고자 정보는 익명으로 처리되며, 신고된 포토리뷰는 검토 후 조치됩니다."
          value={reasonDetail}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setReasonDetail(e.target.value)
          }
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
          onClick={handleClickReport}
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
