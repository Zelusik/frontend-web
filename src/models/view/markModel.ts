export interface getFilteringKeywordsProps {
  keyword: string;
  type: string;
}

export interface getBookmarksProps {
  contents: {
    address: {
      sido: string;
      sgg: string;
      lotNumberAddress: string;
      roadAddress: string;
    };
    category: string;
    id: number;
    images: { thumbnailUrl: string; url: string }[];
    name: string;
    top3Keywords: string[];
  };
  isEmpty: boolean;
  isFirst: boolean;
  isLast: boolean;
  numOfElements: number;
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface getBookmarksContentsProps {
  address: {
    sido: string;
    sgg: string;
    lotNumberAddress: string;
    roadAddress: string;
  };
  category: string;
  id: number;
  images: { thumbnailUrl: string; url: string }[];
  name: string;
  top3Keywords: string[];
}

export interface getBookmarksContentsImagesProps {
  thumbnailUrl: string;
  url: string;
}
