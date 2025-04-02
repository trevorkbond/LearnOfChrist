import { Settings } from "lucide-react";
import BackArrow from "./BackArrow";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed w-full top-0 bg-white px-6 border-b border-black pt-[env(safe-area-inset-top)] pb-3 flex flex-row justify-between">
      <BackArrow />
      <Link href="/settings">
        <Settings color="black" />
      </Link>
    </header>
  );
};

export default Header;
