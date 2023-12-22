import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { ComponentsProps } from "@/models/componentsModal";

export const coreStyles = (props: ComponentsProps) => {
  return {
    width: props?.w,
    height: props?.h,
    maxWidth: props?.maw,
    minWidth: props?.miw,
    maxHeight: props?.mah,
    minHeight: props?.mih,

    margin: `${
      props?.m
        ? props?.m
        : props?.mh && props?.mv
        ? `${props?.mv ? props?.mv : 0}px ${props?.mh ? props?.mh : 0}px`
        : props?.mh
        ? `${props?.mt ? props?.mt : 0}px ${props?.mh}px ${
            props?.mb ? props?.mb : 0
          }px ${props?.mh}px`
        : props?.mv
        ? `${props?.mv}px ${props?.mr ? props?.mr : 0}px ${props?.mv}px ${
            props?.ml ? props?.ml : 0
          }px`
        : `${props?.mt ? props?.mt : 0}px ${props?.mr ? props?.mr : 0}px ${
            props?.mb ? props?.mb : 0
          }px ${props?.ml ? props?.ml : 0}px`
    }`,

    padding: `${
      props?.p
        ? props?.p
        : props?.ph && props?.pv
        ? `${props?.pv ? props?.pv : 0}px ${props?.ph ? props?.ph : 0}px`
        : props?.ph
        ? `${props?.pt ? props?.pt : 0}px ${props?.ph}px ${
            props?.pb ? props?.pb : 0
          }px ${props?.ph}px`
        : props?.pv
        ? `${props?.pv}px ${props?.pr ? props?.pr : 0}px ${props?.pv}px ${
            props?.pl ? props?.pl : 0
          }px`
        : `${props?.pt ? props?.pt : 0}px ${props?.pr ? props?.pr : 0}px ${
            props?.pb ? props?.pb : 0
          }px ${props?.pl ? props?.pl : 0}px`
    }`,

    display: props?.dis,
    flex: props?.flex,
    flexWrap: props?.wrap,
    flexDirection: props?.dir,
    wrap: props?.wrap,

    justifyContent: props?.justify,
    textAlign: props?.text,
    alignItems: props?.align,
    gap: props?.gap,

    ratio: props?.ratio,
    border: `${props?.bw}px solid ${colors[props?.bc]}`,
    borderRadius: props?.radius,
    opacity: props?.o,

    position: props?.pos,
    top: props?.top,
    bottom: props?.bottom,
    left: props?.left,
    right: props?.right,
    zIndex: props?.zIndex,

    overflow: "hidden",

    boxShadow: props?.shadow,
    backgroundColor: props?.bg ? colors[props?.bg] : "transparent",

    ...typography[props?.typo ? props?.typo : "Headline1"],
    color: colors[props?.c ? props?.c : "N100"],
  };
};

// export const coreStyles = makeStyles((props: ComponentsProps) => ({
//   width: (props: any) => props?.w,
//   height: props?.h,
//   // maw?: string | number;
//   // miw?: string | number;
//   // mah?: string | number;
//   // mih?: string | number;

//   margin: `
//     ${props?.m ? props?.m : ``}
//     ${props?.mt ? `${props?.mt}px 0 0 0` : ``}
//     ${props?.mr ? `0 ${props?.mr}px 0 0` : ``}
//     ${props?.mb ? `0 0 ${props?.mb}px 0` : ``}
//     ${props?.ml ? `0 0 0${props?.ml}px` : ``}
//     ${props?.mh ? `0 ${props?.mh}px` : ``}
//     ${props?.mv ? `${props?.mv}px 0` : ``}
//     `,

//   padding: `
//     ${props?.p ? props?.p : ``}
//     ${props?.pt ? `${props?.pt}px 0 0 0` : ``}
//     ${props?.pr ? `0 ${props?.pr}px 0 0` : ``}
//     ${props?.pb ? `0 0 ${props?.pb}px 0` : ``}
//     ${props?.pl ? `0 0 0${props?.pl}px` : ``}
//     ${props?.ph ? `0 ${props?.ph}px` : ``}
//     ${props?.pv ? `${props?.pv}px 0` : ``}
//     `,

//   ...props?.style,
//   // display?: string;
//   // c?: string;
//   // flex?: string;
//   // wrap?: string;
//   // justify?: string;
//   // text?: string;
//   // align?: string;
//   // gap?: string;
//   // ratio?: number;

//   // pos?: string;
//   // top?: number;
//   // bottom?: number;
//   // left?: number;
//   // right?: number;

//   // scroll?: "xy" | "x" | "y" | undefined;
//   // scroll?: boolean;
//   // onTouchStart?: Function;
//   // onTouchMove?: Function;
//   // onTouchEnd?: Function;
//   // onScroll?: any;
// }));
