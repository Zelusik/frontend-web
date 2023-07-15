import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { colors } from "constants/colors";
import { css } from "@emotion/react";
import { typography } from "constants/typography";
import Image from "components/Image";

export default function Profile() {
  const router = useRouter();

  const viewProfile = () => {
    alert("profile");
  };

  return (
    <ProfileWrapper>
      <MenuList>
        <div style={{ display: "flex" }} onClick={viewProfile}>
          <Menu style={{ marginRight: 10 }} typo={{}}>
            <Image
              src="https://i.ibb.co/0Z6FNN7/60pt.png"
              width={24}
              height={24}
              radius={10}
            />
          </Menu>
          <Menu typo={typography.Paragraph5}>고작가</Menu>

          <Menu typo={{}}>
            <Dot />
          </Menu>
          <Menu typo={typography.Paragraph4}>21시간 전에 방문</Menu>
        </div>
      </MenuList>
    </ProfileWrapper>
  );
}

const ProfileWrapper = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
`;

const MenuList = styled.ul`
  width: 100%;
  margin: auto 0;

  display: flex;
`;

const Menu = styled.li<{ typo: any }>`
  margin: auto 0;

  display: flex;
  align-items: center;
  ${({ typo }) =>
    css`
      ${typo}
    `}
  color: ${colors.N80};
`;

const Dot = styled.div`
  width: 2px;
  height: 2px;
  margin: 0 4px;

  border-radius: 2px;
  background-color: ${colors.N60};
`;
