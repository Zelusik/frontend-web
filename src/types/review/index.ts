import { ImageType } from "types/image";

export interface ReviewType {
  placeId?: number;
  placeInfo: PlaceType;
  foodInfo?: FoodType[];
  keywords: string[];
  autoCreatedContent?: string;
  content?: string;
  images: ImageType[];
  [key: string]:
    | number
    | string
    | string[]
    | PlaceType
    | FoodType[]
    | ImageType[]
    | undefined;
}

export interface PlaceType {
  kakaoPid?: string;
  name?: string;
  pageUrl?: string;
  categoryName?: string;
  categoryGroupCode?: string;
  phone?: string;
  lotNumberAddress?: string;
  roadAddress?: string;
  lat: string;
  lng: string;
  [key: string]: string | undefined;
}

export interface FoodType {
  foodName: string;
  foodKeyword?: string[];
  [key: string]: string | string[] | undefined;
}
