import React from "react";

const HeadingAdmin = ({ title }: { title: string }) => {
  return (
    <h1 className="relative text-2xl font-extrabold mb-10 before:absolute before:w-[80px] before:h-1 before:bg-zinc-950 before:dark:bg-white before:bottom-[-12px] before:right-0 before:duration-300 before:hover:w-[100px]">
      {title}
    </h1>
  );
};

export default HeadingAdmin;
