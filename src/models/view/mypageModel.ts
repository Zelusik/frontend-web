export interface getProfileProps {
  birthDay: any;
  gender: string;
  id: number;
  influence: number;
  nickname: string;
  numOfFollowers: number;
  numOfFollowings: number;
  numOfReviews: number;
  profileImage: {
    imageUrl: string;
    thumbnailImageUrl: string;
  };
  tasteStatistics: {
    mostEatenFoodCategory: string;
    mostTaggedReviewKeyword: string;
    mostVisitedLocation: string;
  };
}

export interface getRecommendReviewsProps {
  id: number;
  ranking: number;
  review: {
    id: number;
    images: {
      imageUrl: string;
      menuTags: string[];
      thumbnailImageUrl: string;
    }[];
    place: {
      id: number;
      name: string;
      category: string;
      address: {
        lotNumberAddress: string;
        roadAddress: string;
        sgg: string;
        sido: string;
      };
      isMarked: boolean;
    };
  };
}

export interface getReviewsProps {
  contents: getReviewsContentsProps[];
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
    sorted: boolean;
    unsorted: boolean;
  };
}

export interface getReviewsContentsProps {
  id: number;
  place: {
    address: {
      sido: string;
      sgg: string;
      lotNumberAddress: string;
      roadAddress: string | null;
    };
    category: string;
    id: number;
    isMarked: boolean;
    name: string;
  };
  reviewImage: {
    thumbnailUrl: string;
    url: string;
  };
}
