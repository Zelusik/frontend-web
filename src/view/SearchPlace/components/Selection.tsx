import { useRouter } from "next/router";
import styled from "@emotion/styled";

import { Route } from "constants/Route";
import Text from "components/core/Text";
import useSearch from "hooks/useSearch";
import { Space } from "components/core";

export default function Selection({ type, data, keyword, ...props }: any) {
  const router = useRouter();
  const {
    handleSearchType,
    handleSearchValue,
    handleLocation,
    handlePlaceInfo,
    closeSearchPlace,
  } = useSearch();

  const handleClickSelection = () => {
    const local = JSON.parse(String(localStorage.getItem("currentSelection")));
    if (local) {
      if (type === "location") {
        handleLocation({ lat: data.point.lat, lng: data.point.lng });
        handleSearchValue(data.name);
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
              id: data?.id,
              text: data.name,
              type: 0,
              location: { lat: data.point.lat, lng: data.point.lng },
            }
          : {
              id: data?.id,
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
        handleSearchType(type);
        closeSearchPlace();
        break;
      case "store":
        handlePlaceInfo(data);
        router.push({
          pathname: Route.STORE_DETAIL(),
          query: { kakaoId: data?.id },
        });
        break;
      default:
        break;
    }
  };

  const dataSplit =
    type === "location"
      ? data?.name?.split(keyword)
      : data?.place_name?.split(keyword);

  return (
    <TitleWrapper onClick={handleClickSelection}>
      <div style={{ margin: "auto 0" }}>
        <div style={{ display: "flex" }}>
          {dataSplit?.map((d: any, idx: number) => {
            return (
              <Text
                key={idx}
                typo="Headline4"
                c="N100"
                style={{ display: "flex" }}
              >
                {d?.split(" ")?.map((d2: any, idx2: number) => {
                  return (
                    <span key={idx2}>
                      {d2}
                      {d?.split(" ").length - 1 !== idx2 ? <>&nbsp;</> : null}
                    </span>
                  );
                })}
                {dataSplit?.length - 1 !== idx ? (
                  <Text typo="Headline4" c="Orange600">
                    {keyword?.split(" ")?.map((d2: any, idx2: number) => {
                      return (
                        <span key={idx2}>
                          {d2}
                          {keyword?.split(" ").length - 1 !== idx2 ? (
                            <>&nbsp;</>
                          ) : null}
                        </span>
                      );
                    })}
                  </Text>
                ) : null}
              </Text>
            );
          })}
        </div>

        <Space h={6} />
        <Text typo="Paragraph4" c="N80">
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
