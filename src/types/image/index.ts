export interface ImageType {
  image?: string;
  lat?: string;
  lng?: string;
  preview?: string; // 사진 선택 시 URL.createObjectURL로 추출한 미리보기 정보
  menuTag?: MenuTagType[];
  [key: string]: string | MenuTagType[] | undefined;
}

export interface MenuTagType {
  x?: number;
  y?: number;
  menu?: string;
  [key: string]: number | string | undefined;
}
