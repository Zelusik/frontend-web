import MarkSvg from "assets/mark_28.svg";

interface Props {
  src: any;
  width?: number | string;
  height?: number | string;
  ratio?: number;
  radius?: number | string;
}

export default function Mark({ margin }: any) {
  return (
    <div style={{ margin: margin }}>
      <MarkSvg />
    </div>
  );
}
