import { colors } from "./colors";

// export type TypeOfTypo = typeof typography;
// export type KeyOfTypo = keyof typeof typography;

export const typography = {
  Headline6: {
    fontSize: 24,
    color: colors.N100,
    fontFamily: "SpoqaHanSansNeoBold",
    lineHeight: "140%",
    fontWeight: 700,
  },
  Headline5: {
    fontSize: 20,
    color: colors.N100,
    fontFamily: "SpoqaHanSansNeoBold",
    lineHeight: "140%",
    fontWeight: 700,
  },
  Headline4: {
    fontSize: 18,
    color: colors.N100,
    fontFamily: "SpoqaHanSansNeoBold",
    lineHeight: "140%",
    fontWeight: 700,
  },
  Headline3: {
    fontSize: 16,
    color: colors.N100,
    fontFamily: "SpoqaHanSansNeoBold",
    lineHeight: "140%",
    fontWeight: 700,
  },
  Headline2: {
    fontSize: 14,
    color: colors.N100,
    fontFamily: "SpoqaHanSansNeoBold",
    lineHeight: "140%",
    fontWeight: 700,
  },
  Headline1: {
    fontSize: 12,
    color: colors.N100,
    fontFamily: "SpoqaHanSansNeoBold",
    lineHeight: "140%",
    fontWeight: 700,
  },

  Heading2: {
    fontSize: 12,
    color: colors.N100,
    fontFamily: "SpoqaHanSansNeoMedium",
    lineHeight: "140%",
    fontWeight: 500,
  },
  // Heading1: {
  //   fontSize: 10,
  //   color: colors.N100,
  //   fontFamily: "SpoqaHanSansNeoMedium",
  //   lineHeight: "140%",
  //   fontWeight: 500,
  // },

  Paragraph7: {
    fontSize: 36,
    color: colors.Orange600,
    fontFamily: "SpoqaHanSansNeoBold",
    lineHeight: "140%",
    fontWeight: 600,
  },
  Paragraph6: {
    fontSize: 16,
    color: colors.N100,
    fontFamily: "SpoqaHanSansNeoRegular",
    lineHeight: "140%",
    fontWeight: 400,
  },
  Paragraph5: {
    fontSize: 14,
    color: colors.N100,
    fontFamily: "SpoqaHanSansNeoMedium",
    lineHeight: "140%",
    fontWeight: 400,
  },
  Paragraph4: {
    fontSize: 14,
    color: colors.N100,
    fontFamily: "SpoqaHanSansNeoRegular",
    lineHeight: "140%",
    fontWeight: 500,
  },
  Paragraph3: {
    fontSize: 13,
    color: colors.N100,
    fontFamily: "SpoqaHanSansNeoMedium",
    lineHeight: "140%",
    fontWeight: 400,
  },
  Paragraph2: {
    fontSize: 12,
    color: colors.N100,
    fontFamily: "SpoqaHanSansNeoRegular",
    lineHeight: "140%",
    fontWeight: 400,
  },
  Paragraph1: {
    fontSize: 12,
    color: colors.N100,
    fontFamily: "SpoqaHanSansNeoMedium",
    lineHeight: "140%",
    fontWeight: 400,
  },
} as const;
