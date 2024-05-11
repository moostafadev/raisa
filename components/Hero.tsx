import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="h-[calc(100vh-64px)] py-8 flex items-center justify-center hero-section">
      <div className="container">
        <div className="flex items-center justify-between gap-8 lg:gap-28 flex-col md:flex-row">
          <Image
            src={"/hero.png"}
            alt="raisa image"
            width={1000}
            height={1000}
            className="flex-1 max-w-[250px] sm:max-w-[300px] lg:max-w-[400px] xl:max-w-[100%] hover:scale-105 duration-300"
          />
          <div className="flex flex-col gap-6 xl:gap-8 flex-1 text-center">
            <h2 className="font-extrabold text-[#e58a25] text-3xl xl:text-4xl">
              مطاعم رايسه
            </h2>
            <h1 className="text-white font-black text-5xl xl:text-7xl">
              بخاري مختص
            </h1>
            <div className="flex flex-col gap-4 text-[#e58a25] xl:mt-2">
              <p className="font-extrabold text-2xl xl:text-4xl">
                الطعم علي اصوله و أكتر
              </p>
              <p className="text-xl sm:text-2xl font-bold">
                فطور - كبسات حجازية - معجنات
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
