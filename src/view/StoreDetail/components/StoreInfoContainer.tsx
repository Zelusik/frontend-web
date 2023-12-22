import { useAppSelector } from "@/hooks";

import { InnerTopNavigation } from "@/components/TopNavigation";

import { makeInfo } from "@/utils/makeInfo";
import Info from "@/components/Common/Info";

interface StoreInfoContainerProps {
  refs?: any;
  direction?: string;
  imageSize: number;
  data?: any;
}

const StoreInfoContainer = ({
  refs,
  direction,
  imageSize = 0,
  data,
}: StoreInfoContainerProps) => {
  const { display } = useAppSelector((state) => state.global);

  return (
    <InnerTopNavigation
      scrollRef={refs?.[0]}
      innerScrollRef={refs?.[1]}
      scroll={imageSize + 155}
      padding={20}
      bottomHeight={85}
      direction={direction}
    >
      {makeInfo(data && data).map((data: any, idx: number) => {
        return <Info key={idx} data={data} />;
      })}
    </InnerTopNavigation>
  );
};

export default StoreInfoContainer;
