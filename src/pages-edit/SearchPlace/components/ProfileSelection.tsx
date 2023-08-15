import { useRouter } from "next/router";
import BackTitle from "components/Title/BackTitle";
import styled from "@emotion/styled";
import { typography } from "constants/typography";
import { css } from "@emotion/react";
import Image from "components/Image";
import { Route } from "constants/Route";

export default function ProfileSelection({ text }: any) {
  const router = useRouter();
  const handleClickSelection = () => {
    const local = JSON.parse(String(localStorage.getItem("currentSelection")));
    if (local) {
      const newCurrentSelection = [
        { id: 1, text: "강남구1", type: 2, location: { lat: 0, lng: 0 } },
        ...local,
      ];
      localStorage.setItem(
        "currentSelection",
        JSON.stringify(newCurrentSelection)
      );
    } else {
      localStorage.setItem("currentSelection", JSON.stringify([]));
    }

    router.push({ pathname: Route.MYPAGE(), query: { id: 2 } });
  };

  return (
    <TitleWrapper onClick={handleClickSelection}>
      <div style={{ margin: "auto 0", display: "flex" }}>
        <Image
          alt="프로필 사진"
          src="https://i.ibb.co/2kSZX6Y/60pt.png"
          type="default"
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
