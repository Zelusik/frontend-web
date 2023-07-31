import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Spacing from "components/Spacing";
import { typography } from "constants/typography";
import { css } from "@emotion/react";
import { colors } from "constants/colors";
import Icon from "components/Icon";
import { useAppDispatch } from "hooks/useReduxHooks";
import { changeType } from "reducer/slices/search/searchSlice";
import { Route } from "constants/Route";

const Icons = ["LineMarker", "Restaurant", "LineProfile"];

export default function CurrentSelection({ idx, text, where, ...props }: any) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const clickText = () => {
    const local = JSON.parse(String(localStorage.getItem("currentSelection")));
    if (local) {
      const newValue = local.filter((_: any, idx2: number) => {
        return idx === idx2;
      });
      const newCurrentSelection = local.filter((_: any, idx2: number) => {
        return idx !== idx2;
      });
      localStorage.setItem(
        "currentSelection",
        JSON.stringify([...newValue, ...newCurrentSelection])
      );
      props.setCurrentSelection(newCurrentSelection);

      dispatch(
        changeType({
          type: "search",
          value: newValue.type === 0 ? "location" : "store",
        })
      );
      router.push(Route.MAP());
    } else {
      localStorage.setItem("currentSelection", JSON.stringify([]));
    }
  };

  const clickDelete = () => {
    const local = JSON.parse(String(localStorage.getItem("currentSelection")));
    if (local) {
      const newCurrentSelection = local.filter((_: any, idx2: number) => {
        return idx2 !== idx;
      });
      localStorage.setItem(
        "currentSelection",
        JSON.stringify(newCurrentSelection)
      );
      props.setCurrentSelection(newCurrentSelection);
    } else {
      localStorage.setItem("currentSelection", JSON.stringify([]));
    }
  };

  return (
    <>
      <TitleWrapper>
        <Text typo={typography.Paragraph5} onClick={clickText}>
          <Icon icon={Icons[where]} width={24} height={24} color={colors.N80} />
          <div style={{ margin: "auto 0", marginLeft: 8 }}>{text}</div>
        </Text>
        <Delete
          typo={typography.Paragraph4}
          color={colors.N50}
          onClick={clickDelete}
        >
          <Icon icon="XButton" width={24} height={24} color={colors.N60} />
        </Delete>
      </TitleWrapper>
      <Spacing size={20} />
    </>
  );
}

const TitleWrapper = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: space-between;
`;

const Text = styled.div<{ typo: any }>`
  display: flex;
  ${({ typo }) =>
    css`
      ${typo}
    `}
`;

const Delete = styled.button<{ typo: any; color: any }>`
  ${({ typo }) =>
    css`
      ${typo}
    `}
  color: ${({ color }) => color};
`;
