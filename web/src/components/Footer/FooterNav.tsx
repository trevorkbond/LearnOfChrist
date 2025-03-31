"use client";

import { Icon, LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createElement } from "react";

interface Props {
  href: string;
  icon: LucideIcon;
}

const FooterNav = (props: Props) => {
  const pathName = usePathname();
  const isActive = props.href === pathName;

  return (
    <Link
      href={props.href}
      className={`p-2 transition-colors ${
        isActive ? "text-black" : "text-gray-500 hover:text-black"
      }`}
    >
      {createElement(props.icon, { className: "w-6 h-6" })}
    </Link>
  );
};

export default FooterNav;
