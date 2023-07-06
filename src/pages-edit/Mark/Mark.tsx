import { useRouter } from "next/router";
import BottomNavigation from "components/BottomNavigation";

export default function Mark() {
  const router = useRouter();

  return (
    <>
      <div>Mark</div>
      <BottomNavigation />
    </>
  );
}
