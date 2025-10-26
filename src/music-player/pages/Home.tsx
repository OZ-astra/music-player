import { NavLink } from "react-router-dom";
import { FaMusic, FaPlay, FaHeadphones, FaWifi } from "react-icons/fa";
export default function HomePage() {
  //   Primary: Deep Purple (#6C63FF) or Electric Blue (#3B82F6)

  // Secondary: Neon Pink (#EC4899) or Teal (#14B8A6)

  // Background: Dark Charcoal (#121212)

  // Text: White (#FFFFFF) with subtle Gray (#9CA3AF)
  return (
    <div className=" ">
      <header className="flex justify-between px-3 p-5 bg-[#000000] fixed w-full">
        <div className="flex w-36 items-center ">
          <FaMusic className=" text-purple-500 text-2xl" />
          <h1 className=" text-[1rem] font-bold text-white">Waveform</h1>
        </div>
        <div className="flex w-[60%] items-center gap-4 justify-end">
          <p className="font-medium text-[1rem]">Sign In</p>
          <button className="w-fit px-6 bg-[#3B82F6] py-3 rounded-lg text-[0.8rem] font-medium">
            <NavLink to="/signup">Get Started</NavLink>
          </button>
        </div>
      </header>
      <div className="flex flex-col justify-center "></div>
      <div className="mt-[6rem] leading-tight">
        <h1 className="description font-bold text-[3rem] text-center">
          Your Music, <br />
          <span className="bg-gradient-to-r from-[#4B0082] to-[#EC4899] bg-clip-text text-transparent">
            Endless Possibilites
          </span>
        </h1>
      </div>

      <p className="mt-[2rem] text-[1.2rem] text-[#9CA3AF] w-[90%] mx-auto font-normal text-center leading-tight">
        Discover millions of songs, create perfect playlists and immerse
        yourself in the ultimate music streaming experience
      </p>

      <button className="flex justify-center items-center mt-8 w-fit px-6 text-[1rem] font-medium mx-auto py-3 rounded-2xl bg-[#3B82F6]">
        <FaPlay />
        <span className="ml-2">Start Listening</span>
      </button>

      <div className="grid md:grid-cols-3 md:gap-2 gap-4 mt-8 ">
        <div className="grid-child">
          <div className="w-6 h-6 justify-center relative bg-[#3B82F6] p-[2rem] rounded-lg">
            <FaHeadphones className="text-[1.5rem] absolute top-5 left-5" />
          </div>
          <h2>Premium Quality</h2>
          <p>
            Experience crystal-clear audio with high-fidelity streaming upto
            320kbps.
          </p>
        </div>

        <div className="grid-child">
          <div className="w-6 h-6 justify-center relative p-[2rem] rounded-lg">
            <FaWifi className="text-[1.5rem] absolute top-5 left-5" />
          </div>
          <h2>Personalized Recommenations</h2>
          <p>
            Discover new music tailored to your unique taste with AI-powered
            suggestions
          </p>
        </div>
        <div className="grid-child">
          <div className="w-6 h-6 justify-center relative bg-[#14B8A6] p-[2rem] rounded-lg">
            <FaMusic className="text-[1.5rem] absolute top-5 left-5" />
          </div>
          <h2>Unilimited Playlists</h2>
          <p>
            Create,share, and collaborate on unlimited playlists with friends
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="animation w-fit mx-auto p-10 rounded-full mt-16 bg-[#3B82F6]">
          <FaMusic className="text-[8rem]" />
        </div>
        <h2 className="font-bold text-[2.3rem] text-center mt-6">
          Ready to dive in?
        </h2>
        <p className="mt-[0.2rem] text-[1.2rem] w-[85%] mx-auto text-center leading-tight">
          join millions of music lovers worldwide
        </p>
        <button className="mb-[8rem] bg-white text-[#2f2c6d] mt-9 border w-fit px-4 mx-auto py-3 font-medium text-[1.3rem] rounded-2xl">
          Create Free Account
        </button>
      </div>
      <footer className="border-t-[1px] border-#9ca3af text-center text-[#9ca3af] p-7">
        2024 Waveform. All rights reserved.
      </footer>
    </div>
  );
}
