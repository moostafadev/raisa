import Link from "next/link";
import React from "react";

const MainFooter = () => {
  return (
    <div className="bg-blue-800 dark:bg-blue-900 border-t border-white py-4 text-white">
      <div className="container">
        <div className="text-center tracking-wider text-sm sm:text-base">
          جميع الحقوق محفوظة لدي{" "}
          <Link
            href={"https://mostafasasa010.github.io/Mostafa_Website/"}
            target="_blank"
            className="sm:text-lg font-bold duration-300 hover:text-red-600"
          >
            مصطفي أحمد.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainFooter;
