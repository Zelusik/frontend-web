import styled from "@emotion/styled";

import { useAlert } from "@/hooks/useAlert";
import { Space, Text } from "@/components/core";
import { colors } from "@/constants";

export default function LocationSetting() {
  const { closeAlert } = useAlert();

  return (
    <>
      <Text typo="Paragraph1" c="N100">
        안드로이드
      </Text>
      <Text typo="Paragraph2" c="N100">
        설정 &gt; 애플리케이션 &gt; eatery &gt; 개인정보 보호 &gt; 권한 &gt;
        허용되지 않음 &gt; 위치 &gt; &quot;앱 사용 중에만 허용&quot; 선택
      </Text>
      <Space h={16} />
      <Text typo="Paragraph1" c="N100">
        iOS
      </Text>
      <Text typo="Paragraph2" c="N100">
        설정 &gt; (하단의)eatery &gt; 위치 &gt; &quot;앱 사용하는 동안&quot;
        선택
      </Text>
      <Space h={20} />
      <Button onClick={closeAlert}>
        <Text typo="Paragraph5" c="N0">
          확인
        </Text>
      </Button>
    </>
  );
}

const Button = styled.div`
  width: 110px;
  margin: auto;
  padding: 10px 0;
  //   display: flex;

  text-align: center;

  border-radius: 999px;
  background-color: ${colors.N100};
`;
