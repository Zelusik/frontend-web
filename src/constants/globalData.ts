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
  { val: "신선한 재료" },
  { val: "최고의 맛" },
  { val: "완벽 메뉴조합" },
  { val: "현지느낌 가득" },
  { val: "가성비 갑" },
  { val: "넉넉한 양" },
];

export const atmosphereKeyword = [
  { val: "술과 함께" },
  { val: "데이트에 최고" },
  { val: "웃어른과" },
  { val: "혼밥 가능" },
  { val: "단체모임에 딱" },
  { val: "웨이팅 있음" },
  { val: "조용조용한" },
  { val: "왁자지껄한" },
];
export const FOOD_KEYWORD: any = {
  FRESH: "신선한 재료",
  BEST_FLAVOR: "최고의 맛",
  BEST_MENU_COMBINATION: "완벽 메뉴 조합",
  LOCAL_FLAVOR: "현지 느낌 가득",
  GOOD_PRICE: "가성비 갑",
  GENEROUS_PROTIONS: "넉넉한 양",

  "신선한 재료": "FRESH",
  "최고의 맛": "BEST_FLAVOR",
  "완벽 메뉴 조합": "BEST_MENU_COMBINATION",
  "현지 느낌 가득": "LOCAL_FLAVOR",
  "가성비 갑": "GOOD_PRICE",
  "넉넉한 양": "GENEROUS_PROTIONS",

  WITH_ALCOHOL: "술과 함께",
  GOOD_FOR_DATE: "데이트에 최고",
  WITH_ELDERS: "웃어른과",
  CAN_ALONE: "혼밥 가능",
  PERFECT_FOR_GROUP_MEETING: "단체모임에 딱",
  WAITING: "웨이팅 있음",
  SILENT: "조용조용한",
  NOISY: "왁자지껄한",

  "술과 함께": "WITH_ALCOHOL",
  "데이트에 최고": "GOOD_FOR_DATE",
  웃어른과: "WITH_ELDERS",
  "혼밥 가능": "CAN_ALONE",
  "단체모임에 딱": "PERFECT_FOR_GROUP_MEETING",
  "웨이팅 있음": "WAITING",
  조용조용한: "SILENT",
  왁자지껄한: "NOISY",
};

// dayOfWeekData.ts

export const dayOfWeekData = [
  { val: "월" },
  { val: "화" },
  { val: "수" },
  { val: "목" },
  { val: "금" },
  { val: "토" },
  { val: "일" },
];

export const DAY_OF_WEEK_DATA = {
  월: "MON",
  화: "TUE",
  수: "WED",
  목: "THU",
  금: "FRI",
  토: "SAT",
  일: "SUN",
};

// sortData.ts

export const sortData: any = [
  { id: 1, val: "관련도순" },
  { id: 2, val: "최신순" },
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

export const TASTE_KEYWORD = {
  한식: "KOREAN",
  일식: "JAPANESE",
  중식: "CHINESE",
  "고기/구이": "MEET",
  양식: "WESTERN",
  치킨: "CHICKEN",
  분식: "STREET",
  패스트푸드: "FAST_FOOD",
  디저트: "CAFE_DESERT",
  아시안푸드: "ASIAN",
  샌드위치: "SANDWICH",
  "퓨전/세계": "FUSION_WORLD",
  뷔페: "BUFFET",
  술집: "BAR",
};

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

// reportData.ts

export const storeReportData = [
  { val: "음식점의 위치" },
  { val: "운영 시간" },
  { val: "휴무일 정보" },
  { val: "전화번호" },
  { val: "sns 정보" },
  { val: "기타" },
];

export const reportData = [
  { val: "해당 음식점과 관련 없는 내용임" },
  { val: "광고/홍보성 게시글임" },
  { val: "선정적이거나 폭력, 혐오적임" },
  { val: "무단 도용, 사칭, 저작권 침해가 의심됨" },
  { val: "개인 정보 노출이 우려됨" },
  { val: "기타" },
];
