import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { Route } from "constants/Route";

export default function SlideImage({
  type = "primary",
  images = [],
  side = 20,
  ...props
}: any) {
  const router = useRouter();
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
    <ImageWrapper onClick={clickImageDetail}>
      <ImageInner>
        {images.map((data: any, idx: number) => {
          return (
            <Image
              alt="음식 사진"
              key={idx}
              src={data}
              marginLeft={idx === 0}
              marginRight={idx === images.length - 1}
              side={side}
              ratio={200 / 240}
            />
          );
        })}
      </ImageInner>
    </ImageWrapper>
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

const Image = styled.img<{
  marginLeft: boolean;
  marginRight: boolean;
  side: number;
  ratio: any;
}>`
  width: 200px;
  margin-left: ${({ marginLeft, side }) => (marginLeft ? `${side}px` : "0")};
  margin-right: ${({ marginRight, side }) =>
    marginRight ? `${side}px` : "8px"};
  display: inline-block;
  border-radius: 40px;

  aspect-ratio: ${({ ratio }) => ratio};
  border-radius: 12px;
  object-fit: cover;
`;
