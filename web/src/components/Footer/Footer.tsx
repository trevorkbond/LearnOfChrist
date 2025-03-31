"use client";

import { BookOpen, ChartPie, List } from "lucide-react";
import FooterNav from "./FooterNav";

const Footer = () => {
  return (
    <footer className="sticky bottom-0 bg-gray-800 text-white px-15 pt-6 pb-8 flex flex-row justify-between">
      <FooterNav href="/" icon={BookOpen} />
      <FooterNav href="/about" icon={List} />
      <FooterNav href="/contact" icon={ChartPie} />
    </footer>
  );
};

export default Footer;
