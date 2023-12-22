import { useRouter } from "next/router";
import { Flex, Text } from "@/components/core";

interface HashtagProps {
  key?: number;
  color?: any;
  typo?: any;
  background?: any;

  hashColor?: any;
  hashTypo?: any;

  textColor?: any;
  textTypo?: any;
  hashtagText?: string;
}

const Hashtag = ({
  color = "Orange300",
  typo = "Paragraph4",
  background = "Orange100",

  hashColor,
  hashTypo,

  textColor,
  textTypo,
  hashtagText = "_____",
}: HashtagProps) => {
  const router = useRouter();

  return (
    <Flex h={40} ph={12} bg={background} radius={40}>
      <Flex justify="center" align="center">
        <Text
          c={hashColor ? hashColor : color}
          typo={hashTypo ? hashTypo : typo}
        >
          #&nbsp;
        </Text>
      </Flex>
      <Flex justify="center" align="center">
        <Text
          c={textColor ? textColor : color}
          typo={textTypo ? textTypo : typo}
        >
          {hashtagText}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Hashtag;
