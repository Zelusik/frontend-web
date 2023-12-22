import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { Route } from "@/constants/Route";
import { AspectRatio, Flex, Image, ScrollArea } from "@/components/core";
import { useRef } from "react";

export default function SlideImage({ images = [], touch }: any) {
  const router = useRouter();

  const handleTouchStart = (e: any) => {
    touch.setTouch(true);
  };
  const handleTouchEnd = (e: any) => {
    touch.setTouch(false);
  };
  const clickImageDetail = () => {
    router.push({
      pathname: Route.IMAGE_DETAIL(),
      query: {
        length: images.length,
        image1: images[0],
        image2: images[1],
        image3: images[2],
        image4: images[3],
        image5: images[4],
        image6: images[5],
        image7: images[6],
        image8: images[7],
        image9: images[8],
      },
    });
  };

  return (
    <Flex onClick={clickImageDetail} style={{ whiteSpace: "nowrap" }}>
      <ScrollArea
        scroll="x"
        ph={20}
        dis="flex"
        gap={8}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((image: string, idx: number) => {
          return (
            <AspectRatio
              key={idx}
              w={200}
              miw={200}
              ratio={200 / 240}
              radius={12}
            >
              <Image alt="음식 사진" src={image} />
            </AspectRatio>
          );
        })}
      </ScrollArea>
    </Flex>
  );
}
