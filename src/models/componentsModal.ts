export interface ComponentsProps {
  veiwportRef?: any;
  key?: string | number;
  tabIndex?: number;
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
  dir?: string;
  wrap?: string;
  justify?: string;
  text?: string;
  align?: string;
  gap?: string | number;
  radius?: string | number;
  ratio?: number;
  o?: string | number;

  pos?: string;
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
  zIndex?: number;

  shadow?: string;
  bg?: string;

  typo?: string;
  c?: string;

  onTouchStart?: any;
  onTouchMove?: any;
  onTouchEnd?: any;
  onClick?: any;
}
