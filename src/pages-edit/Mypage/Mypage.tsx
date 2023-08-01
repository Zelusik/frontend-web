import { useRouter } from "next/router";
import BottomNavigation from "components/BottomNavigation";
import BackTitle from "components/Title/BackTitle";
import styled from "@emotion/styled";
import ProfileInfo from "./components/ProfileInfo";

import Spacing from "components/Spacing";
import Dots from "components/Button/IconButton/Dots";
import Setting from "components/Button/IconButton/Setting";
import TasteBox from "./components/TasteBox";

export default function Mypage() {
  const router = useRouter();
  console.log(router.query);
  const mypage = true;

  return (
    <>
      <MypageWrapper>
        {mypage ? <Spacing size={50} /> : <BackTitle type="secondary" />}
        <ProfileInfo />
        <IconWrapper top={mypage ? 16 : 50}>
          {mypage ? <Setting /> : <Dots />}
        </IconWrapper>
        <Spacing size={30} />

        <TasteBox />
      </MypageWrapper>
      <BottomNavigation />
    </>
  );
}

const MypageWrapper = styled.div`
  padding: 0 20px;
`;

const IconWrapper = styled.div<{ top: number }>`
  position: absolute;
  top: ${({ top }) => top}px;
  right: 20px;
`;
