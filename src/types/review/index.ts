export interface ReviewType {
  placeId?: number;
  placeInfo: PlaceType;
  foodInfo?: FoodType[];
  keywords: string[];
  autoCreatedContent?: string;
  content?: string;
  images: TransformedImageDataType[];
  [key: string]:
    | number
    | string
    | string[]
    | PlaceType
    | FoodType[]
    | TransformedImageDataType[]
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

export interface OriginalImageDataType {
  image: string;
  preview: string;
  lat: string;
  lng: string;
  menuTag: { x: number; y: number; menu: string }[];
}

export interface TransformedImageDataType {
  image: string;
  menuTags: { content: string; point: { x: number; y: number } }[];
}
