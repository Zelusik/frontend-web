import styled from "@emotion/styled";
import { match } from "ts-pattern";

/* eslint-disable @next/next/no-img-element */
type ObjectFitOption = "fill" | "contain" | "cover" | "none" | "scale-down";

interface Props {
  alt: string;
  src: any;

  type: any;
  size?: number;
  objectFit?: ObjectFitOption;
  onClick?: any;
}

export default function Image({
  alt,
  src,

  type = "default",
  size = 30,
  objectFit = "cover",
  onClick,
}: Props) {
  return (
    <ImageBox
      alt={alt}
      src={src}
      width={match(type)
        .with("home-detail", () => "100%")
        .with("store-detail", () => "100%")
        .with("home", () => "100%")
        .with("map-bottom-sheet", () => "100%")
        .with("mypage-review", () => "100%")
        .with("review", () => "100%")
        .with("default", () => size)
        .otherwise(() => "100%")}
      ratio={match(type)
        .with("home-detail", () => 1)
        .with("store-detail", () => 360 / 281)
        .with("home", () => 8 / 9)
        .with("map-bottom-sheet", () => 55 / 32)
        .with("mypage-review", () => 157 / 170)
        .with("review", () => 1.14)
        .with("default", () => 1)
        .otherwise(() => 1)}
      radius={match(type)
        .with("home-detail", () => "0")
        .with("store-detail", () => "0")
        .with("home", () => "20px")
        .with("map-bottom-sheet", () => "0")
        .with("mypage-review", () => "12px")
        .with("review", () => "12px")
        .with("default", () => "38%")
        .otherwise(() => "0")}
      objectFit={objectFit}
      onClick={onClick}
    />
  );
}

const ImageBox = styled.img<{
  ratio: number;
  radius: string;
  objectFit: ObjectFitOption;
}>`
  height: 100%;

  aspect-ratio: ${({ ratio }) => ratio};
  border-radius: ${({ radius }) => radius};
  object-fit: ${({ objectFit }) => objectFit};
`;
