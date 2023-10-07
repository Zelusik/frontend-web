import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Image from "components/Image";
import { Route } from "constants/Route";
import Text from "components/core/Text";

export default function ProfileSelection({ data, keyword }: any) {
  const router = useRouter();
  const handleClickSelection = () => {
    const local = JSON.parse(String(localStorage.getItem("currentSelection")));
    if (local) {
      const repeat = local.filter((d: any) => {
        return !(d.type === 2 && d.text === data.nickname);
      });
      const newCurrentSelection = [
        {
          id: data?.id,
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

    router.push({ pathname: Route.MYPAGE(), query: { id: data?.id } });
  };

  const dataSplit = data?.nickname?.split(keyword);

  return (
    <TitleWrapper onClick={handleClickSelection}>
      <div style={{ margin: "auto 0", display: "flex" }}>
        <Image
          alt="프로필 사진"
          src={data.profileThumbnailImage}
          type="default"
        />
        {dataSplit?.map((d: any, idx: number) => {
          return (
            <Text
              key={idx}
              typo="Headline4"
              c="N100"
              style={{
                margin: "auto 0",
                display: "flex",
                marginLeft: idx === 0 ? 8 : 0,
              }}
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
    </TitleWrapper>
  );
}

const TitleWrapper = styled.div`
  width: 100%;
  height: 62px;
  display: flex;
  justify-content: space-between;
`;
