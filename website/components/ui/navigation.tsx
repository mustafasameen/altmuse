import * as React from "react";

const Navigation = () => {
  return (
    <nav className="absolute top-0 left-0 w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-start items-center h-16">
          <a href="/" className="text-xl font-bold text-neutral-800 m-8">
            Home
          </a>
          <a href="/about" className="text-xl font-bold text-neutral-800 m-8">
            About
          </a>
        </div>
      </div>
    </nav>
  );
}

Navigation.displayName = "Navigation";
export default Navigation;