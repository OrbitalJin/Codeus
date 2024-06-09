import React from "react";
import { useNavigate } from "react-router-dom";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }: LogoProps) => {
  const navigate = useNavigate();
  return (
    <a
      onClick={() => {
        navigate("/");
      }}
      className={`cursor-pointer group ${className}`}
    >
      <span className="group-hover:text-indigo-500 group-hover:font-bold transition-all">
        Code
      </span>
      <span className="font-bold text-indigo-500 group-hover:text-primary group-hover:font-normal transition-all">
        us
      </span>
      <span className="group-hover:animate-blink ">{"_"}</span>
    </a>
  );
};

export default Logo;
