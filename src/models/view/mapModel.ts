export interface getNearProps {
  contents: {
    address: {
      sido: string;
      sgg: string;
      lotNumberAddress: string;
      roadAddress: string;
    };
    category: string;
    id: number;
    images: {
      thumbnailUrl: string;
      url: string;
    }[];
    isMarked: boolean;
    name: string;
    point: { lat: number | string; lng: number | string };
    top3Keywords: string[];
  }[];
  isEmpty: boolean;
  isFirst: boolean;
  isLast: boolean;
  numOfElements: number;
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface getNearContentsProps {
  address: {
    sido: string;
    sgg: string;
    lotNumberAddress: string;
    roadAddress: string;
  };
  category: string;
  id: number;
  images: {
    thumbnailUrl: string;
    url: string;
  }[];
  isMarked: boolean;
  name: string;
  point: { lat: number | string; lng: number | string };
  top3Keywords: string[];
}

export interface getNearContentsImagesProps {
  thumbnailUrl: string;
  url: string;
}

export interface FilterDatasProps {
  type: "full" | "full-radius";
  text: string;
  textList: any;
  original: any;
  new: any;
  Fn: any;
}
