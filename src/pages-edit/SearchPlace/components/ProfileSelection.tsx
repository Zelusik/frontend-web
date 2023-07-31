import { useRouter } from "next/router";
import BackTitle from "components/Title/BackTitle";
import styled from "@emotion/styled";
import { typography } from "constants/typography";
import { css } from "@emotion/react";
import { colors } from "constants/colors";
import Icon from "components/Icon";
import Image from "components/Image";

const Icons = ["LineMarker", "Restaurant", "LineProfile"];

export default function ProfileSelection({ text }: any) {
  const router = useRouter();

  return (
    <TitleWrapper>
      <div style={{ margin: "auto 0", display: "flex" }}>
        <Image
          alt="프로필 사진"
          src="https://i.ibb.co/0Z6FNN7/60pt.png"
          width={30}
          height={30}
          radius={10}
        />
        <Text typo={typography.Headline4}>{text}</Text>
      </div>
    </TitleWrapper>
  );
}

const TitleWrapper = styled.div`
  width: 100%;
  height: 62px;
  display: flex;
  justify-content: space-between;
`;

const Text = styled.div<{ typo: any; color?: any }>`
  margin: auto 0;
  margin-left: 8px;
  ${({ typo }) =>
    css`
      ${typo}
    `}
`;
