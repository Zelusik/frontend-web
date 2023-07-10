import MarkSvg from "assets/mark_28.svg";

interface Props {
  src: any;
  width?: number | string;
  height?: number | string;
  ratio?: number;
  radius?: number | string;
}

export default function Heart({ margin }: any) {
  return <MarkSvg style={{ margin: margin }} />;
}
