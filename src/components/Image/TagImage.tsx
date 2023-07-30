import styled from "@emotion/styled";

interface Props {
  src: any;
  onClick?: any;
}

export default function TagImage({ src, onClick }: Props) {
  return <ImageBox src={src} onClick={onClick} />;
}

const ImageBox = styled.img`
  width: 100%;
  aspect-ratio: 1;
`;
