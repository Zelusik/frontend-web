import { useRouter } from "next/router";
import RoundButton from "components/Button/RoundButton";
import { Box, Flex, Text, Space, AspectRatio, Image } from "components/core";

interface ProfileInfoProps {
  mine: boolean;
  profileData: any;
}

export default function ProfileInfo({ mine, profileData }: ProfileInfoProps) {
  const router = useRouter();

  const PROFILE_DATA = [
    { desc: "게시글", count: profileData?.numOfReviews },
    { desc: "영향력", count: profileData?.influence },
    { desc: "팔로워", count: profileData?.numOfFollowers },
    { desc: "팔로잉", count: profileData?.numOfFollowings },
  ];

  return (
    <Flex w="100%" h={88} pos="relative" align="center">
      <AspectRatio miw={74} mr={24} ratio={1}>
        <Image
          alt="프로필 사진"
          src={profileData?.profileDataImage?.thumbnailImageUrl}
          w={74}
          radius={24}
        />
      </AspectRatio>
      <Box w="100%">
        <Flex w="100%" h="fit-content" m="auto" justify="space-between">
          <Text typo="Headline4" c="N100">
            {profileData?.nickname}
          </Text>
          {!mine && <RoundButton type="follow-icon" />}
        </Flex>
        <Space h={16} />

        <Flex gap={20} text="center">
          {PROFILE_DATA?.map((profile: any, idx: number) => {
            return (
              <Box key={idx}>
                <Text typo="Headline2" c="N100">
                  {profile?.count}
                </Text>
                <Text typo="Paragraph2" c="N100">
                  {profile?.desc}
                </Text>
              </Box>
            );
          })}
        </Flex>
      </Box>
    </Flex>
  );
}
