import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { colors } from "constants/colors";

export default function Hashtags() {
  const router = useRouter();

  return (
    <HashtagsWrapper>
      {["# 단체모임에 딱", "# 현지느낌 가득", "# 데이트에 최고"].map(
        (data: any, idx: number) => {
          return (
            <MenuWrapper key={idx}>
              <Menu>{data}</Menu>
            </MenuWrapper>
          );
        }
      )}
    </HashtagsWrapper>
  );
}

const HashtagsWrapper = styled.div`
  width: 100%;
  //   display: flex;
  //   flex-direction: row;
  //   gap: 8px;
`;

const MenuWrapper = styled.ul`
  height: 37px;
  margin-right: 8px;
  padding: 0 12px;

  display: inline-block;
  border-radius: 40px;
  background-color: ${colors.Orange100};
`;

const Menu = styled.li`
  height: 100%;
  margin: auto;
  display: flex;
  align-items: center;
`;
