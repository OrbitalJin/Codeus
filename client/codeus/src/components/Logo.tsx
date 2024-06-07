import Link from "next/link";
import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }: LogoProps) => {
  return (
    <Link href="/" className={`group ${className}`}>
      <span className="group-hover:text-indigo-500 group-hover:font-bold transition-all">
        Code
      </span>
      <span className="font-bold text-indigo-500 group-hover:text-primary group-hover:font-normal transition-all">
        us
      </span>
      <span className="group-hover:animate-blink ">{"_"}</span>
    </Link>
  );
};

export default Logo;
