import { useEffect, useState } from "react";

import "./styles.css";
type adviceResponse = {
  slip?: {
    id: number;
    advice: string;
  };
};
export default function AdviceGenerator() {
  const [advice, setAdvice] = useState<adviceResponse>({});
  const [isSmall, setIsSmall] = useState(true);

  async function getAdvice() {
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      if (!response.ok) {
        throw new Error("oops something went wrong");
      }
      const responseData = await response.json();
      console.log("advice:", responseData);

      setAdvice(responseData);
    } catch (err: any) {
      console.log(err.message);
    }
  }

  function handleResize() {
    if (window.innerWidth >= 768) {
      console.log("i am medium");
      setIsSmall(false);
    }
  }

  useEffect(() => {
    getAdvice();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className=" relative bg-[hsl(217,19%,24%)] px-5 flex flex-col justify-center w-[90vw] md:w-[450px] rounded-lg">
      <p className="mt-8 text-[hsl(150,100%,66%)] text-center text-[0.7rem] font-[400] tracking-[0.25rem]">
        ADVICE #{advice.slip?.id}
      </p>
      <p className="advice mt-6 text-[1.5rem] text-center text-[hsl(193,38%,86%)]">
        " {advice.slip?.advice} "
      </p>
      <div className="mx-auto mt-8 mb-8">
        <img
          src="./advice-images/pattern-divider-mobile.svg"
          alt=""
          className={`${isSmall === true ? "inline" : "hidden"}`}
        />

        <img
          src="./advice-images/pattern-divider-desktop.svg"
          alt=""
          className={`${isSmall === false ? "inline" : "hidden"}`}
        />
      </div>
      <button
        onClick={() => getAdvice()}
        className="dice border absolute -bottom-12 left-1/2 -translate-x-1/2 bg-[hsl(150,100%,66%)] rounded-[50%] w-[60px] h-[60px] flex flex-col justify-center align-middle"
      >
        <img
          src="./advice-images/icon-dice.svg"
          alt=""
          className="text-center mx-auto"
        />
      </button>
    </div>
  );
}
