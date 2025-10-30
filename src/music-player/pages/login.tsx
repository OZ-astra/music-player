import React from "react";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Auth from "../components/authentication"
import {
  FaMusic,
  FaLock,
  FaEnvelope,
  FaFacebook,
  FaChrome,
  FaEye,
  FaArrowLeft,
} from "react-icons/fa";
import InputFields from "../components/inputFields";

const login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center h-[100%] bg-gradient-to-br from-[#121212] via-[#1a1a2e] to-[#16213e]">
      <header className=" mt-10 text-center">
        <div className="flex w-full items-center justify-center">
          <FaMusic className=" text-purple-500 text-lg" />
          <h1 className=" text-[1.8rem] font-bold text-white ml-2">Waveform</h1>
        </div>
        <h1 className="text-[1.5rem] font-bold">Welcome Back</h1>
        <p className=" text-[#9CA3AF] font-normal text-[0.9rem]">
          Sign in to continue your musical journey
        </p>
      </header>

      <div className="mt-16 my-6 rounded-2xl bg-white/5 p-6">
        <form
          noValidate
          className=" flex flex-col justify-center mt-2 w-[100%]"
        >
          <div className="input-fields mx-auto">
            <label>Email</label> <br />
            <div>
              <FaEnvelope />
              <input type="email" placeholder="your@email.com" />
            </div>
            <label>Password</label> <br />
            <div>
              <FaLock />
              <input
                type={showPassword === true ? "text" : "password"}
                placeholder="........."
                className="placeholder:text-[2.5rem] placeholder:tracking-tighter"
              />
              <button
                type="button"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                <FaEye />
              </button>
            </div>
          </div>
          <div className="flex justify-between text-[0.9rem] font-200">
            <div>
              <input type="checkbox" />
              <span className="ml-1">Remember me</span>
            </div>
            <button className="text-[#3B82F6]">Forget Password</button>
          </div>
          <button className="mx-auto py-3 w-full rounded-2xl mt-4 font-700 text-[1.1rem] text-white bg-[#3B82F6] shadow-md hover:shadow-[#3B82F6]">
            Sigin in
          </button>
        </form>

        <div className="flex gap-2 items-center justify-center mt-3">
          <div className="border-t border-[#9CA3AF]/2 w-[30%]"></div>
          <span className="text-[#9CA3AF] text-[0.9rem] px-2 bg-[#394353] rounded-sm">
            or continue with
          </span>
          <div className="border-b w-[30%]"></div>
        </div>
<Auth/>
        <div className="text-[0.9rem] text-center font-400 mt-5 mb-8">
          Already have an account?{" "}
          <NavLink to="/signup" className="text-[#3B82F6]">
            Signup
          </NavLink>
        </div>
      </div>
      <button
        onClick={() => navigate("/")}
        className="mb-24 flex items-center gap-2 text-[0.7rem] font-300 text-[#9CA3AF]"
      >
        <FaArrowLeft />
        <span>Back to home</span>
      </button>
    </div>
  );
};

export default login;
