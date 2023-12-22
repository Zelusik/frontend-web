import { useRouter } from "next/router";
import { Route } from "@/constants";
import { Box, Flex, Image, Space, Text } from "@/components/core";

interface ProfileButtonProps {
  id: number;
  image: string;
  imageSize?: number;
  nickname: string;
  createdAt?: string;
  display?: string;
}

const ProfileButton = ({
  id,
  image,
  imageSize = 30,
  nickname,
  createdAt,
  display = "block",
}: ProfileButtonProps) => {
  const router = useRouter();
  const handleClickProfile = () => {
    router.push({
      pathname: Route.MYPAGE(),
      query: { id },
    });
  };

  return (
    <Flex align="center" onClick={handleClickProfile}>
      <Image alt="" src={image} w={imageSize} h={imageSize} radius={10} />
      <Space w={8} />
      <Box dis={display} align="center">
        <Text c="N100" typo="Headline2">
          {nickname}
        </Text>
        <Text c="N100" typo="Paragraph1">
          {createdAt}
        </Text>
      </Box>
    </Flex>
  );
};

export default ProfileButton;
