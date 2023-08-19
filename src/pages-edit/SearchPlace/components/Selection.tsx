import { useRouter } from "next/router";
import styled from "@emotion/styled";

import { Route } from "constants/Route";
import Text from "components/Text";
import useSearch from "hooks/useSearch";

export default function Selection({ type, data, ...props }: any) {
  const router = useRouter();
  const { valueSetting, typeSetting, locationSetting, placeInfoSetting } =
    useSearch();

  const handleClickSelection = () => {
    const local = JSON.parse(String(localStorage.getItem("currentSelection")));
    if (local) {
      if (type === "location") {
        locationSetting({ lat: data.point.lat, lng: data.point.lng });
        valueSetting(data.name);
      }

      const repeat = local.filter((d: any) => {
        return !(
          d.type === (type === "location" ? 0 : 1) &&
          d.text === (type === "location" ? data.name : data.place_name)
        );
      });
      const newCurrentSelectin = [
        type === "location"
          ? {
              id: data.id,
              text: data.name,
              type: 0,
              location: { lat: data.point.lat, lng: data.point.lng },
            }
          : {
              id: data.id,
              text: data.place_name,
              type: 1,
              location: { lat: data.y, lng: data.x },
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
        placeInfoSetting(data);
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
          {type === "location" ? data.name : data.place_name}
        </Text>
        <Text typo="Paragraph4" color="N80">
          {type === "location"
            ? `${data.sido} ${data.sgg !== null ? data.sgg : ``}`
            : `${data.address_name.split(" ")[0]} ${
                data.address_name.split(" ")[1]
              }`}
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
