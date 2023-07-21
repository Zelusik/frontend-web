import { useRouter } from "next/router";
import BottomNavigation from "components/BottomNavigation";
import Spacing from "components/Spacing";
import Selections from "./components/Selections";

export default function Map() {
  const router = useRouter();

  return (
    <>
      <Spacing size={16} />
      <Spacing size={8} />
      <Selections />
      <BottomNavigation />
    </>
  );
}
