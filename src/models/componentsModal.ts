export interface ComponentsProps {
  viewportRef?: any;
  key?: string | number;
  children?: any;

  style?: any;
  w?: string | number;
  h?: string | number;
  maw?: string | number;
  miw?: string | number;
  mah?: string | number;
  mih?: string | number;

  p?: string | number;
  pt?: string | number;
  pb?: string | number;
  pl?: string | number;
  pr?: string | number;
  ph?: string | number;
  pv?: string | number;

  m?: string | number;
  mt?: string | number;
  mb?: string | number;
  ml?: string | number;
  mr?: string | number;
  mh?: string | number;
  mv?: string | number;

  dis?: string;
  flex?: string;
  wrap?: string;
  justify?: string;
  text?: string;
  align?: string;
  gap?: number;
  radius?: number;
  ratio?: number;

  pos?: string;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;

  shadow?: string;
  bg?: string;

  typo?: string;
  c?: string;

  onClick?: Function;
}
