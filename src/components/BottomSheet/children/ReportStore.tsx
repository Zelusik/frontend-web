import styled from "@emotion/styled";
import { useRouter } from "next/router";
import useBottomSheet from "hooks/useBottomSheet";

import Icon from "components/Icon";
import Spacing from "components/Spacing";
import Text from "components/Text";
import { Route } from "constants/Route";

interface Props {}

export default function ReportStore({}: Props) {
  const router = useRouter();
  const { closeBottomSheetQuick } = useBottomSheet({});

  const clickPrimary = () => {
    router.push(Route.REPORT());
    closeBottomSheetQuick();
  };

  return (
    <>
      <Spacing size={10} />
      <ReportButton onClick={clickPrimary}>
        <Icon icon="Share" width={20} height={20} />
        <Text typo="Headline2" color="N100" style={{ marginLeft: 6 }}>
          정보 수정 제안하기
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
