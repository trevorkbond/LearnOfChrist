"use client";

import { BookOpen, ChartPie, List, Settings } from "lucide-react";
import FooterNav from "./FooterNav";

const Footer = () => {
  return (
    <footer className="fixed w-full bottom-0 bg-gray-200 px-15 pt-6 pb-8 flex flex-row justify-between">
      <FooterNav href="/works" icon={BookOpen} />
      <FooterNav href="/topic" icon={List} />
      <FooterNav href="/progress" icon={ChartPie} />
      <FooterNav href="/settings" icon={Settings} />
    </footer>
  );
};

export default Footer;
