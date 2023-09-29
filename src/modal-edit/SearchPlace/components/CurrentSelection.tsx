import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Spacing from "components/Spacing";
import Icon from "components/Icon";
import { Route } from "constants/Route";
import useSearch from "hooks/useSearch";
import Text from "components/Text";

const Icons = ["LineMarker", "Restaurant", "LineProfile"];

export default function CurrentSelection({ idx, data, ...props }: any) {
  const router = useRouter();
  const {
    closeSearchPlace,
    handleSearchType,
    handleSearchValue,
    handleLocation,
  } = useSearch();

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

      switch (newValue[0].type) {
        case 0:
          handleSearchType("location");
          handleLocation({ lat: data.location.lat, lng: data.location.lng });
          closeSearchPlace();
          handleSearchValue(newValue[0].text);
          break;
        case 1:
          router.push({
            pathname: Route.STORE_DETAIL(),
            query: { kakaoId: data?.id },
          });
          break;
        case 2:
          router.push({ pathname: Route.MYPAGE(), query: { id: data?.id } });
          break;
        default:
          break;
      }
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
          <div style={{ margin: "auto 0", marginLeft: 8 }}>{data?.text}</div>
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
