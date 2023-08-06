import Korean from "assets/taste/Korean.svg";
import Japanese from "assets/taste/Japanese.svg";
import Chinese from "assets/taste/Chinese.svg";
import Meat from "assets/taste/Meat.svg";
import Western from "assets/taste/Western.svg";
import Chicken from "assets/taste/Chicken.svg";
import SnackBar from "assets/taste/SnackBar.svg";
import Fastfood from "assets/taste/Fastfood.svg";
import Dessert from "assets/taste/Dessert.svg";
import Asian from "assets/taste/Asian.svg";
import Sandwich from "assets/taste/Sandwich.svg";
import Fusion from "assets/taste/Fusion.svg";
import Buffet from "assets/taste/Buffet.svg";
import Bar from "assets/taste/Bar.svg";

// keywordData.ts

export const foodKeyword = [
  "신선한 재료",
  "최고의 맛",
  "완벽 메뉴조합",
  "현지느낌 가득",
  "가성비 갑",
  "넉넉한 양",
];

export const atmosphereKeyword = [
  "술과 함께",
  "데이트에 최고",
  "웃어른과",
  "혼밥 가능",
  "단체모임에 딱",
  "웨이팅 있음",
  "조용조용한",
  "왁자지껄한",
];

// tasteData.ts

export const tasteData = [
  { icon: Korean, val: "한식" },
  { icon: Japanese, val: "일식" },
  { icon: Chinese, val: "중식" },
  { icon: Meat, val: "고기/구이" },
  { icon: Western, val: "양식" },
  { icon: Chicken, val: "치킨" },
  { icon: SnackBar, val: "분식" },
  { icon: Fastfood, val: "패스트푸드" },
  { icon: Dessert, val: "디저트" },
  { icon: Asian, val: "아시안푸드" },
  { icon: Sandwich, val: "샌드위치" },
  { icon: Fusion, val: "퓨전/세계" },
  { icon: Buffet, val: "뷔페" },
  { icon: Bar, val: "술집" },
];

// termsData.ts

export const termsData = [
  { key: "isNotMinor", val: "(필수) 만 14세 이상입니다.", link: "" },
  {
    key: "service",
    val: "(필수) 서비스 이용약관",
    link: "https://www.notion.so/asdfqweasd/62a472bea0694d24820bd25a821fc1b2?pvs=4",
  },
  {
    key: "userInfo",
    val: "(필수) 개인정보 수집/이용 동의",
    link: "https://www.notion.so/asdfqweasd/5f7764c4baea4528ae1fd15841c6ced6?pvs=4",
  },
  {
    key: "locationInfo",
    val: "(선택) 위치정보 제공",
    link: "https://www.notion.so/asdfqweasd/fac45c2486bb4e82a03fa60694341e79?pvs=4",
  },
  {
    key: "marketingReception",
    val: "(선택) 마케팅 수신 동의",
    link: "https://www.notion.so/asdfqweasd/48cd18103b1c4e2eab93a499d50484e5?pvs=4",
  },
];
