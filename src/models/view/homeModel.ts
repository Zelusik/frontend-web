export interface getFeedProps {
  contents: {
    content: string;
    createdAt: string;
    id: number;
    keywords: string[];
    place: {
      address: {
        lotNumberAddress: string;
        roadAddress: string;
        sgg: string;
        sido: string;
      };
      category: string;
      id: number;
      isMarked: boolean;
      name: string;
      top3Keywords: string[];
    };
    reviewImage: {
      thumbnailUrl: string;
      url: string;
    };
    writer: {
      birthDay: null | string;
      email: string;
      favoriteFoodCategories: string[];
      gender: string;
      id: number;
      image: { url: string; thumbnailUrl: string };
      nickname: string;
      roleTypes: string;
    };
  };
  hasContent: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  isFirst: boolean;
  isLast: boolean;
  numOfElements: number;
  number: number;
  size: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
}

export interface getFeedContentsProps {
  content: string;
  createdAt: string;
  id: number;
  keywords: string[];
  place: {
    address: {
      lotNumberAddress: string;
      roadAddress: string;
      sgg: string;
      sido: string;
    };
    category: string;
    id: number;
    isMarked: boolean;
    name: string;
    top3Keywords: string[];
  };
  reviewImage: {
    thumbnailUrl: string;
    url: string;
  };
  writer: {
    birthDay: null | string;
    email: string;
    favoriteFoodCategories: string[];
    gender: string;
    id: number;
    image: { url: string; thumbnailUrl: string };
    nickname: string;
    roleTypes: string;
  };
}
