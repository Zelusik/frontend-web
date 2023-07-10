import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { colors } from "constants/colors";

export default function Hashtags({ hashtags }: any) {
  const router = useRouter();

  return (
    <HashtagsWrapper>
      <HashtagsInner>
        {hashtags.map((data: string, idx: number) => {
          return (
            <MenuWrapper
              key={idx}
              marginLeft={idx === 0}
              marginRight={idx === hashtags.length - 1}
            >
              <Menu># {data}</Menu>
            </MenuWrapper>
          );
        })}
      </HashtagsInner>
    </HashtagsWrapper>
  );
}

const HashtagsWrapper = styled.div`
  display: flex;
  white-space: nowrap;
`;

const HashtagsInner = styled.div`
  display: flex;
  overflow: auto;
`;

const MenuWrapper = styled.div<{ marginLeft: boolean; marginRight: boolean }>`
  height: 37px;
  margin-left: ${({ marginLeft }) => (marginLeft ? "20px" : "0")};
  margin-right: ${({ marginRight }) => (marginRight ? "20px" : "8px")};
  padding: 0 12px;
  display: inline-block;
  border-radius: 40px;
  background-color: ${colors.Orange100};
`;

const Menu = styled.div`
  height: 100%;
  margin: auto;
  display: flex;
  align-items: center;
`;
