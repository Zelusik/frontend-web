import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { colors } from "constants/colors";
import { css } from "@emotion/react";
import { typography } from "constants/typography";
import { match } from "ts-pattern";

export default function SlideImage({
  type = "primary",
  images = [],
  side = 20,
}: any) {
  const router = useRouter();

  return (
    <ImageWrapper>
      <ImageInner>
        {images.map((data: string, idx: number) => {
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
  margin-right: ${({ marginRight, side }) => (marginRight ? `${side}px` : "8px")};
  display: inline-block;
  border-radius: 40px;

  aspect-ratio: ${({ ratio }) => ratio};
  border-radius: 12px;
  object-fit: cover;
`;
