import { useRouter } from "next/router";
import { Center, Box, Flex, Text, Space, Image } from "@mantine/core";
import { Route } from "constants/Route";
import { colors } from "constants/colors";
import { typography } from "constants/typography";

interface ProfileButtonProps {
  id: number;
  image: string;
  nickname: string;
  createdAt: string;
}

const ProfileButton = ({
  id,
  image,
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
      <Center>
        <Image src={image} w={30} h={30} radius={10} />
      </Center>
      <Space w={8} />
      <Box>
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
