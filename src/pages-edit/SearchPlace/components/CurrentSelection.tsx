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
import useSearch from "hooks/useSearch";
import Text from "components/Text";

const Icons = ["LineMarker", "Restaurant", "LineProfile"];

export default function CurrentSelection({ idx, data, ...props }: any) {
  const router = useRouter();
  const { typeSetting } = useSearch();

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

      console.log(newValue[0].type);
      typeSetting(newValue[0].type === 0 ? "location" : "store");
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
        <Text
          typo="Paragraph5"
          color="N100"
          onClick={clickText}
          style={{ display: "flex" }}
        >
          <Icon icon={Icons[data.type]} width={24} height={24} color="N80" />
          <div style={{ margin: "auto 0", marginLeft: 8 }}>{data.text}</div>
        </Text>
        <Text typo="Paragraph4" color="N50" onClick={clickDelete}>
          <Icon icon="XButton" width={24} height={24} color="N60" />
        </Text>
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
