import { useRouter } from "next/router";
import { Route } from "constants/Route";
import { colors } from "constants/colors";
import { typography } from "constants/typography";
import { Box, Flex, Image, Space, Text } from "components/core";

interface ProfileButtonProps {
  id: number;
  image: string;
  imageSize?: number;
  nickname: string;
  createdAt?: string;
}

const ProfileButton = ({
  id,
  image,
  imageSize = 30,
  nickname,
  createdAt,
}: ProfileButtonProps) => {
  const router = useRouter();
  const handleClickProfile = () => {
    router.push({
      pathname: Route.MYPAGE(),
      query: { id },
    });
  };

  return (
    <Flex onClick={handleClickProfile}>
      {/* <Center> */}
      <Image alt="" src={image} w={imageSize} h={imageSize} radius={10} />
      {/* </Center> */}
      <Space w={8} />
      <Box dis="flex" align="center">
        <Text c={colors["N100"]} style={typography["Headline2"]}>
          {nickname}
        </Text>
        <Text c={colors["N100"]} style={typography["Paragraph1"]}>
          {createdAt}
        </Text>
      </Box>
    </Flex>
  );
};

export default ProfileButton;
