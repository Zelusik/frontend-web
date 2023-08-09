import styled from "@emotion/styled";
import { useRouter } from "next/router";
import useBottomSheet from "hooks/useBottomSheet";

import { Route } from "constants/Route";
import Icon from "components/Icon";
import Spacing from "components/Spacing";
import Text from "components/Text";

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
      <Spacing size={10} />
      <ReportButton onClick={clickPrimary}>
        <Icon icon="Share" width={20} height={20} />
        <Text typo="Headline2" color="N100" style={{ marginLeft: 6 }}>
          공유하기
        </Text>
      </ReportButton>
      <Spacing size={26} />
      <ReportButton onClick={clickSecondary}>
        <Icon icon="Report" width={20} height={20} />
        <Text typo="Headline2" color="N100" style={{ marginLeft: 6 }}>
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
