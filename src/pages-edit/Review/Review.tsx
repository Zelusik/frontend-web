import { useRouter } from "next/router";
import BottomNavigation from "components/BottomNavigation";

export default function Review() {
  const router = useRouter();

  return (
    <>
      <div>Review</div>
      <BottomNavigation />
    </>
  );
}
