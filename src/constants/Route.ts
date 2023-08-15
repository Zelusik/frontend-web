interface RouteType {
  [key: string]: () => string;
}
export const Route: RouteType = {
  LOGIN: () => "/login",
  TERMS: () => "/login/terms",
  TASTE: () => "/login/taste",

  HOME: () => "/",
  STORE_DETAIL: () => "/store-detail",
  REPORT: () => "/report",
  MAP_DETAIL: () => "/map-detail",

  MAP: () => "/map",
  SEARCH_PLACE: () => "/search-place",

  REVIEW: () => "/review",
  REVIEW_PLACE: () => "/review/select/place",
  REVIEW_MENU: () => "/review/select/menu",
  REVIEW_KEYWORD: () => "/review/select/keyword",
  REVIEW_FOOD_KEYWORD: () => "/review/select/food-keyword",
  REVIEW_WRITE: () => "/review/write",
  REVIEW_SEARCH_PLACE: () => "/review/search-place",

  MARK: () => "/mark",
  MYPAGE: () => "/mypage",
  RECOMMEND_BEST: () => "/mypage/recommand-best",
  SETTING: () => "/mypage/setting",
  EDIT_PROFILE: () => "/mypage/setting/edit-profile",
  NOTIFICATION: () => "/mypage/setting/notification",
  DELETE_PROFILE: () => "/mypage/setting/delete-profile",
  ANNOUNCEMENT: () => "/mypage/setting/announcement",
  INQUIRY: () => "/mypage/setting/inquiry",
  PRIVACY_POLICY: () => "/mypage/setting/privacy-policy",

  REVIEW_DETAIL: () => "/review-detail",
  IMAGE_DETAIL: () => "/image-detail",
};
