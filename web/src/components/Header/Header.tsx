import { Settings } from "lucide-react";
import BackArrow from "./BackArrow";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 bg-gray-200 px-6 pt-14 pb-3 flex flex-row justify-between">
      <BackArrow />
      <Link href="/settings">
        <Settings color="black" />
      </Link>
    </header>
  );
};

export default Header;
