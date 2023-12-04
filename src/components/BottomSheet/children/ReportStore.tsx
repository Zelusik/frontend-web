import styled from "@emotion/styled";
import { useRouter } from "next/router";
import useBottomSheet from "hooks/useBottomSheet";

import Icon from "components/Icon";

import Text from "components/core/Text";
import { Route } from "constants/Route";
import { Space } from "components/core";

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
      <Space h={10} />
      <ReportButton onClick={clickPrimary}>
        <Icon icon="Share" width={20} height={20} />
        <Text typo="Headline2" c="N100" style={{ marginLeft: 6 }}>
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
