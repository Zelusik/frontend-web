import styled from "@emotion/styled";
import { useRouter } from "next/router";
import useBottomSheet from "hooks/useBottomSheet";

import { Route } from "constants/Route";
import Icon from "components/Icon";

import Text from "components/core/Text";
import { Space } from "components/core";

interface Props {}

export default function ShareReport({}: Props) {
  const router = useRouter();
  const { closeBottomSheetQuick } = useBottomSheet({});

  const clickPrimary = () => {};

  const clickSecondary = () => {
    router.push(Route.REPORT());
    closeBottomSheetQuick();
  };

  return (
    <>
      <Space h={10} />
      <ReportButton onClick={clickPrimary}>
        <Icon icon="Share" width={20} height={20} />
        <Text typo="Headline2" c="N100" style={{ marginLeft: 6 }}>
          공유하기
        </Text>
      </ReportButton>
      <Space h={26} />
      <ReportButton onClick={clickSecondary}>
        <Icon icon="Report" width={20} height={20} />
        <Text typo="Headline2" c="N100" style={{ marginLeft: 6 }}>
          신고하기
        </Text>
      </ReportButton>
    </>
  );
}

const ReportButton = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
`;
