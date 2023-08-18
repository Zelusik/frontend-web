import { useRouter } from "next/router";
import styled from "@emotion/styled";

import { Route } from "constants/Route";
import Text from "components/Text";
import useSearch from "hooks/useSearch";

export default function Selection({ type, data }: any) {
  const router = useRouter();
  const { typeSetting, locationSetting } = useSearch();

  const handleClickSelection = () => {
    const local = JSON.parse(String(localStorage.getItem("currentSelection")));
    if (local) {
      locationSetting({ lat: data.point.lat, lng: data.point.lng });

      const repeat = local.filter((d: any) => {
        return !(
          d.type === (type === "location" ? 0 : 1) && d.text === data.name
        );
      });
      const newCurrentSelectin = [
        {
          id: data.id,
          text: data.name,
          type: type === "location" ? 0 : 1,
          location: { lat: data.point.lat, lng: data.point.lng },
        },
        ...repeat,
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

    switch (type) {
      case "location":
        typeSetting(type);
        router.push(Route.MAP());
        break;
      case "store":
        router.push({
          pathname: Route.STORE_DETAIL(),
          query: { kakaoId: data.id },
        });
        break;
      default:
        break;
    }
  };

  return (
    <TitleWrapper onClick={handleClickSelection}>
      <div style={{ margin: "auto 0" }}>
        <Text typo="Headline4" color="N100">
          {data.name}
        </Text>
        <Text typo="Paragraph4" color="N80">
          {type === "location"
            ? `${data.sido} ${data.sgg !== null ? data.sgg : ``}`
            : `${data.address.sido} ${data.address.sgg}`}
        </Text>
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
