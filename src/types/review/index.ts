import { ImageType } from "types/image";

export interface ReviewType {
  placeInfo: PlaceType;
  keywords: string[];
  autoCreatedContent?: string;
  content?: string;
  images: ImageType[];
  [key: string]: string | string[] | PlaceType | ImageType[] | undefined;
}

export interface PlaceType {
  kakaoPid?: string;
  name?: string;
  pageUrl?: string;
  categoryGroupName?: string;
  phone?: string;
  lotNumberAddress?: string;
  roadAddress?: string;
  lat: string;
  lng: string;
  [key: string]: string | undefined;
}
