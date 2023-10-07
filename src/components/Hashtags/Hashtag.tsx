import { useRouter } from "next/router";
import { colors } from "constants/colors";
import { typography } from "constants/typography";
import { Flex, Text } from "components/core";

interface HashtagProps {
  key?: number;
  color?: any;
  typo?: any;

  hashColor?: any;
  hashTypo?: any;

  textColor?: any;
  textTypo?: any;
  hashtagText?: string;
}

export default function Hashtag({
  color = "Orange300",
  typo = "Paragraph4",

  hashColor,
  hashTypo,

  textColor,
  textTypo,
  hashtagText = "_____",
}: HashtagProps) {
  const router = useRouter();

  return (
    <Flex
      pl={12}
      pr={12}
      h={40}
      bg={colors["Orange100"]}
      style={{ borderRadius: 40 }}
    >
      {/* <Center> */}
      <Text
        c={colors[hashColor ? hashColor : color]}
        style={typography[hashTypo ? hashTypo : typo]}
      >
        #&nbsp;
      </Text>
      {/* </Center> */}
      {/* <Center> */}
      <Text
        c={colors[textColor ? textColor : color]}
        style={typography[textTypo ? textTypo : typo]}
      >
        {hashtagText}
      </Text>
      {/* </Center> */}
    </Flex>
  );
}
