import styled from "@emotion/styled";
import { useRouter } from "next/router";
import useBottomSheet from "hooks/useBottomSheet";
import useAlert from "hooks/useAlert";

import { Route } from "constants/Route";
import Icon from "components/Icon";
import Spacing from "components/Spacing";
import Text from "components/Text";

interface Props {}

export default function DeleteEdit({}: Props) {
  const router = useRouter();
  const { openAlert } = useAlert();
  const { closeBottomSheetQuick } = useBottomSheet({});

  const clickPrimary = () => {
    openAlert("review-delete");
    closeBottomSheetQuick();
  };

  const clickSecondary = () => {
    router.push(Route.REPORT());
    closeBottomSheetQuick();
  };

  return (
    <>
      <Spacing size={10} />
      <ReportButton onClick={clickPrimary}>
        <Icon icon="Trash" width={20} height={20} />
        <Text typo="Headline2" color="N100" style={{ marginLeft: 6 }}>
          삭제하기
        </Text>
      </ReportButton>
      <Spacing size={26} />
      <ReportButton onClick={clickSecondary}>
        <Icon icon="Edit" width={20} height={20} />
        <Text typo="Headline2" color="N100" style={{ marginLeft: 6 }}>
          수정하기
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
