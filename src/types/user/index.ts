export interface UserInfoType {
  birthDay?: string;
  email: string;
  favoriteFoodCategories: string[];
  gender: string;
  id: number;
  image: { url: string; thumbnailUrl: string };
  nickname: string;
  [key: string]:
    | number
    | string
    | string[]
    | { url: string; thumbnailUrl: string }
    | undefined;
}
