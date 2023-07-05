import { useRouter } from "next/router";
import BottomNavigation from "components/BottomNavigation";

export default function Map() {
  const router = useRouter();

  return (
    <>
      <div>Map</div>
      <BottomNavigation />
    </>
  );
}
