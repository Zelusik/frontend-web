import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { typography } from "constants/typography";
import { css } from "@emotion/react";
import { colors } from "constants/colors";
import { useAppDispatch } from "hooks/useReduxHooks";
import { changeType } from "reducer/slices/search/searchSlice";
import { Route } from "constants/Route";

export default function Selection({ type, text, location }: any) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleClickSelection = () => {
    const local = JSON.parse(String(localStorage.getItem("currentSelection")));
    if (local) {
      const newCurrentSelectin = [
        {
          id: 0,
          text: "강남구1",
          type: type === "location" ? 0 : 1,
          location: { lat: 1, lng: 1 },
        },
        ...local,
      ].filter((_, idx) => {
        return idx < 5;
      });
      localStorage.setItem(
        "currentSelection",
        JSON.stringify(newCurrentSelectin)
      );
    } else {
      localStorage.setItem("currentSelection", JSON.stringify([]));
    }

    dispatch(
      changeType({
        type: "search",
        value: type,
      })
    );
    router.push(Route.MAP());
  };

  return (
    <TitleWrapper onClick={handleClickSelection}>
      <div style={{ margin: "auto 0" }}>
        <Text typo={typography.Headline4}>{text}</Text>
        <SubText typo={typography.Paragraph4} color={colors.N80}>
          {location}
        </SubText>
      </div>
    </TitleWrapper>
  );
}

const TitleWrapper = styled.div`
  width: 100%;
  height: 79px;
  display: flex;
  justify-content: space-between;
`;

const Text = styled.div<{ typo: any; color?: any }>`
  ${({ typo }) =>
    css`
      ${typo}
    `}
`;

const SubText = styled.div<{ typo: any; color?: any }>`
  ${({ typo }) =>
    css`
      ${typo}
    `}
  color: ${({ color }) => color};
`;
