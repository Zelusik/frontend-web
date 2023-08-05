import styled from "@emotion/styled";
import Icon from "components/Icon";
import Spacing from "components/Spacing";
import Text from "components/Text";
import { Route } from "constants/Route";
import { useAppDispatch } from "hooks/useReduxHooks";
import { useRouter } from "next/router";
import { changeVisible } from "reducer/slices/bottomSheet/bottomSheetSlice";

interface Props {}

export default function Report({}: Props) {
  const router = useRouter();
  const mine = true;
  const dispatch = useAppDispatch();

  const clickPrimary = () => {
    if (mine) {
      return;
    }
  };

  const clickSecondary = () => {
    if (mine) {
      return;
    }
    router.push(Route.REPORT());
    dispatch(
      changeVisible({
        type: "bottomSheet",
        value: 0,
      })
    );
  };

  return (
    <>
      <Spacing size={10} />
      <ReportButton onClick={clickPrimary}>
        <Icon icon={mine ? "Trash" : "Share"} width={20} height={20} />
        <Text typo="Headline2" color="N100" style={{ marginLeft: 6 }}>
          {mine ? "삭제하기" : "공유하기"}
        </Text>
      </ReportButton>
      <Spacing size={26} />
      <ReportButton onClick={clickSecondary}>
        <Icon icon={mine ? "Edit" : "Report"} width={20} height={20} />
        <Text typo="Headline2" color="N100" style={{ marginLeft: 6 }}>
          {mine ? "수정하기" : "신고하기"}
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
