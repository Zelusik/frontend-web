import { useRouter } from "next/router";
import BottomNavigation from "components/BottomNavigation";

export default function Mypage() {
  const router = useRouter();

  return (
    <>
      <div>Mypage</div>
      <BottomNavigation />
    </>
  );
}
