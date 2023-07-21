import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { colors } from "constants/colors";
import { css } from "@emotion/react";
import { typography } from "constants/typography";
import RoundButton from "components/Button/RoundButton";

export default function Selections({}: any) {
  const router = useRouter();
  const foods = ["한식", "중식", "고기/구이", "고기/구이"];

  return (
    <HashtagsWrapper>
      <HashtagsInner>
        <MenuWrapper marginLeft={true} marginRight={false}>
          <RoundButton type="map-icon" act={true} textPadding="0 0 0 8px" />
        </MenuWrapper>

        <MenuWrapper marginLeft={false} marginRight={false}>
          <RoundButton type="map-icon" act={false} textPadding="0 0 0 8px" />
        </MenuWrapper>

        {foods.map((data: string, idx: number) => {
          return (
            <MenuWrapper
              key={idx}
              marginLeft={false}
              marginRight={idx === foods.length - 1}
            >
              <RoundButton type="text" act={false} text={data} />
            </MenuWrapper>
          );
        })}
      </HashtagsInner>
    </HashtagsWrapper>
  );
}

const HashtagsWrapper = styled.div`
  height: 44px;
  display: flex;
  white-space: nowrap;
`;

const HashtagsInner = styled.div`
  height: 44px;
  display: flex;
  overflow: auto;
`;

const MenuWrapper = styled.div<{ marginLeft: boolean; marginRight: boolean }>`
  height: 40px;
  margin: auto;
  margin-left: ${({ marginLeft }) => (marginLeft ? "15px" : "0")};
  margin-right: ${({ marginRight }) => (marginRight ? "15px" : "6px")};

  display: inline-block;
  border-radius: 40px;
`;
