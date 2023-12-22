import { useRouter } from "next/router";
import useDisplaySize from "@/hooks/useDisplaySize";
import SadBobpool from "@/components/SadBobpool";
import { Route } from "@/constants/Route";

const Custom404 = () => {
  const router = useRouter();
  const { height } = useDisplaySize();

  const handleButtonClick = () => {
    router.push(Route.HOME());
  };

  return (
    <SadBobpool
      height={height}
      text="잘못된 페이지에 접근하셨습니다"
      buttonText="Home으로 돌아가기"
      buttonClick={handleButtonClick}
    />
  );
};

export default Custom404;
