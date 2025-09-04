import { useEffect, useState } from "react";
import largeImages from "./data.js";
import "./styles.css";
export default function Ecommerce() {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % largeImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <header className=" bg-[gold] rounded-b-2xl">
        <div className=" flex justify-between px-4 pt-5 pb-2 ">
          <img
            src="./commerceAssets/logo.jpg"
            alt="logo"
            className="w-12 h-12 rounded-[50%]"
          />
          <button>
            <img
              src="./commerceAssets/icons/menu.svg"
              alt="menu icon"
              className="w-10"
            />
          </button>
        </div>
        <div className=" relative">
          {largeImages.map((image, index) => {
            return (
              <div
                key={index}
                className={`mx-3 mt-5 overflow-hidden absolute transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? " opacity-100" : "opacity-0"
                }`}
              >
                <img src={image} alt="" className="active rounded-xl" />
              </div>
            );
          })}
        </div>
      </header>
    </div>
  );
}
