import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { colors } from "constants/colors";

import Image from "components/Image";
import Text from "components/Text";

export default function ProfileTime() {
  const router = useRouter();

  const viewProfile = () => {
    alert("profile");
  };

  return (
    <Wrapper onClick={viewProfile}>
      <Image
        type="default"
        alt="프로필 사진"
        src="https://i.ibb.co/0Z6FNN7/60pt.png"
        size={24}
      />

      <Text typo="Paragraph5" color="N80" style={{ marginLeft: 10 }}>
        고작가
      </Text>
      <Dot />
      <Text typo="Paragraph4" color="N80">
        21시간 전에 방문
      </Text>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
`;

const Dot = styled.div`
  width: 2px;
  height: 2px;
  margin: 0 4px;

  border-radius: 2px;
  background-color: ${colors.N60};
`;
