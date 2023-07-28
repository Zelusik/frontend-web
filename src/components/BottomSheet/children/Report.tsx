import styled from "@emotion/styled";
import Icon from "components/Icon";
import Spacing from "components/Spacing";
import { Route } from "constants/Route";
import { useAppDispatch } from "hooks/useReduxHooks";
import { useRouter } from "next/router";
import { changeVisible } from "reducer/slices/bottomSheet/bottomSheetSlice";

interface Props {}

export default function Report({}: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleClickReport = () => {
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
      <ReportButton>
        <Icon icon="Share" width={20} height={20} />
        <Text>공유하기</Text>
      </ReportButton>
      <Spacing size={26} />
      <ReportButton onClick={handleClickReport}>
        <Icon icon="Report" width={20} height={20} />
        <Text>신고하기</Text>
      </ReportButton>
    </>
  );
}

const ReportButton = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
`;

const Text = styled.div`
  width: 100%;
  margin-left: 6px;
`;
