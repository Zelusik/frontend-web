import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { colors } from "constants/colors";

import Image from "components/Image";
import Text from "components/Text";
import { Route } from "constants/Route";

export default function ProfileTime({ data }: any) {
  const router = useRouter();

  const viewProfile = () => {
    router.push({ pathname: Route.MYPAGE(), query: { id: data?.id } });
  };

  return (
    <Wrapper onClick={viewProfile}>
      <Image
        type="default"
        alt="프로필 사진"
        src={data?.profileThumbnailImageUrl}
        size={24}
      />

      <Text typo="Paragraph5" color="N80" style={{ marginLeft: 10 }}>
        {data?.nickname}
      </Text>
      {/* <Text typo="Paragraph4" color="N80">
        21시간 전에 방문
      </Text> */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
`;
