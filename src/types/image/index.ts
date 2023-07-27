export interface ImageType {
  image?: string;
  thumbnailImage?: string;
  lat?: string;
  lng?: string;
  preview?: string; // 사진 선택 시 URL.createObjectURL로 추출한 미리보기 정보
  [key: string]: string | undefined;
}
