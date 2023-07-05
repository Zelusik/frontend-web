import { useRouter } from "next/router";
import BottomNavigation from "components/BottomNavigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div>Hi</div>
      <BottomNavigation />
    </>
  );
}
