"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BackArrow = () => {
  const pathName = usePathname();
  const lastSlashIndex = pathName.lastIndexOf("/");
  const isLastSlashIndex = lastSlashIndex !== -1;
  const href = isLastSlashIndex
    ? pathName.substring(0, lastSlashIndex) || "/"
    : "/";
  const visibility =
    pathName === "/" || pathName === "/login" ? "invisible" : "visible";

  return (
    <Link href={href} className={`${visibility} cursor-pointer`}>
      <ChevronLeft color="black" />
    </Link>
  );
};

export default BackArrow;
