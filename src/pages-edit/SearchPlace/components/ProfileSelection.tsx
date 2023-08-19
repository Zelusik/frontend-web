import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Image from "components/Image";
import { Route } from "constants/Route";
import Text from "components/Text";

export default function ProfileSelection({ data }: any) {
  const router = useRouter();
  const handleClickSelection = () => {
    const local = JSON.parse(String(localStorage.getItem("currentSelection")));
    if (local) {
      const repeat = local.filter((d: any) => {
        return !(d.type === 2 && d.text === data.nickname);
      });
      const newCurrentSelection = [
        {
          id: data.id,
          text: data.nickname,
          type: 2,
          location: { lat: 0, lng: 0 },
        },
        ...repeat,
      ].filter((_, idx) => {
        return idx < 5;
      });

      localStorage.setItem(
        "currentSelection",
        JSON.stringify(newCurrentSelection)
      );
    } else {
      localStorage.setItem("currentSelection", JSON.stringify([]));
    }

    router.push({ pathname: Route.MYPAGE(), query: { id: data.id } });
  };

  return (
    <TitleWrapper onClick={handleClickSelection}>
      <div style={{ margin: "auto 0", display: "flex" }}>
        <Image
          alt="프로필 사진"
          src={data.profileThumbnailImage}
          type="default"
        />
        <Text typo="Headline4" color="N100" style={{ marginLeft: 8 }}>
          {data.nickname}
        </Text>
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
