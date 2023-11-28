import React from "react";
import FAQ from "../FAQ";

const FAQPage: React.FC = () => {
  return (
    <div>
      <nav className="relative flex w-full flex-wrap items-center justify-between font-bold uppercase bg-neutral-100 py-2 text-neutral-500 shadow-lg focus:text-neutral-700 dark:bg-neutral-300 lg:py-4">
        <div className="flex w-full flex-wrap items-center justify-between px-5">
          <div>FAQ</div>
        </div>
      </nav>
      <div className="p-6 m-5 bg-white rounded shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2),0_10px_20px_-2px_rgba(0,0,0,0.1)]">
        <FAQ/>
        
      </div>
    </div>
  );
};

export default FAQPage;
