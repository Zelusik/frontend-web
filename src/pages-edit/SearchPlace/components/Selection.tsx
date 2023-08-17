import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { useAppDispatch } from "hooks/useReduxHooks";
import { changeType } from "reducer/slices/search/searchSlice";

import { Route } from "constants/Route";
import Text from "components/Text";
import useSearch from "hooks/useSearch";

export default function Selection({ type, data }: any) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { locationSetting } = useSearch();

  const handleClickSelection = () => {
    const local = JSON.parse(String(localStorage.getItem("currentSelection")));
    if (local) {
      locationSetting({ lat: data.point.lat, lng: data.point.lng });

      const newCurrentSelectin = [
        {
          text: data.name,
          type: type === "location" ? 0 : 1,
          location: { lat: data.point.lat, lng: data.point.lng },
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
        <Text typo="Headline4" color="N100">
          {data.name}
        </Text>
        <Text typo="Paragraph4" color="N80">
          {data.sido} {data.sgg}
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
