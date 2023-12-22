import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { Route } from "@/constants/Route";
import Text from "@/components/core/Text";
import { Box, Image, Space } from "@/components/core";

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
    <Box
      w="100%"
      h={62}
      dis="flex"
      justify="space-between"
      onClick={handleClickSelection}
    >
      <Box w="100%" mv="auto" dis="flex" align="center">
        <Image
          alt="프로필 사진"
          src={data?.profileThumbnailImage}
          w={30}
          h={30}
          radius={12}
        />
        <Space w={8} />
        {dataSplit?.map((d: any, idx: number) => {
          return (
            <Text
              key={idx}
              mv="auto"
              ml={idx === 0 ? 8 : 0}
              dis="flex"
              typo="Headline4"
              c="N100"
            >
              {d?.split(" ")?.map((d2: any, idx2: number) => {
                return (
                  <span key={idx2}>
                    {d2}
                    {d?.split(" ").length - 1 !== idx2 ? <>&nbsp;</> : null}
                  </span>
                );
              })}
              {dataSplit?.length - 1 !== idx && (
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
              )}
            </Text>
          );
        })}
      </Box>
    </Box>
  );
}
