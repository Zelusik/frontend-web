import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { Route } from "constants/Route";
import { AspectRatio, Flex, Image, ScrollArea } from "components/core";

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
    <Flex
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={clickImageDetail}
      style={{ whiteSpace: "nowrap" }}
    >
      <ScrollArea scroll="x" ph={20} dis="flex" gap={8}>
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

const ImageWrapper = styled.div`
  display: flex;
  white-space: nowrap;
`;

const ImageInner = styled.div`
  display: flex;
  overflow: auto;
`;

// const Image = styled.img<{
//   marginLeft: boolean;
//   marginRight: boolean;
//   side: number;
//   ratio: any;
// }>`
//   width: 200px;
//   margin-left: ${({ marginLeft, side }) => (marginLeft ? `${side}px` : "0")};
//   margin-right: ${({ marginRight, side }) =>
//     marginRight ? `${side}px` : "8px"};
//   display: inline-block;
//   border-radius: 40px;

//   object-fit: cover;
// `;
