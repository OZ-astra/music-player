import "../styles.css";
import { FaMusic, FaLock, FaApple, FaChrome, FaEye } from "react-icons/fa";
import { useNavigate, NavLink } from "react-router-dom";
import InputFields from "../components/inputFields";
import { useState } from "react";
export default function signup() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [emptyInput, setEmptyInput] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [error, setError] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    checked: false,
  });

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();
  let isValid: boolean;
  function handleEmail() {
    if (input.email === "") {
      setEmptyInput((prev) => ({ ...prev, email: true }));
      isValid = false;
    } else {
      setEmptyInput((prev) => ({ ...prev, email: false }));
      isValid = true;
      if (
        !input.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ) {
        setError((prev) => ({ ...prev, email: true }));
        console.log("invalid!!!");
        isValid = false;
      } else {
        setError((prev) => ({ ...prev, email: false }));
        isValid = true;
      }
    }
  }

  function handlePassword() {
    if (input.password === "") {
      setEmptyInput((prev) => ({ ...prev, password: true }));
      isValid = false;
    } else {
      setEmptyInput((prev) => ({ ...prev, password: false }));
      isValid = true;
      if (
        !input.password.match(
          /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{8,}$/
        )
      ) {
        setError((prev) => ({ ...prev, password: true }));
        isValid = false;
      } else {
        setError((prev) => ({ ...prev, password: false }));
        isValid = true;
      }
    }
  }

  function handleConfirmPassword() {
    if (input.confirmPassword === "") {
      setEmptyInput((prev) => ({ ...prev, confirmPassword: true }));
      isValid = false;
    } else {
      setEmptyInput((prev) => ({ ...prev, confirmPassword: false }));
      isValid = true;
      if (input.confirmPassword !== input.password) {
        setError((prev) => ({ ...prev, confirmPassword: true }));
        isValid = false;
      } else {
        setError((prev) => ({ ...prev, confirmPassword: false }));
        isValid = true;
      }
    }
  }

  function handleChecked() {
    if (checked === true) {
      setError((prev) => ({ ...prev, checked: false }));
      isValid = true;
    } else {
      setError((prev) => ({ ...prev, checked: true }));
      isValid = false;
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleEmail();
    handlePassword();
    handleConfirmPassword();
    handleChecked();
    if (isValid === true) {
      navigate("/");
    }
  }

  return (
    <div className="conic h-[100vh] w-[100vw] bg-gradient-to-br from-[#121212] via-[#1a1a2e] to-[#16213e] flex flex-col justify-center ">
      <div className="mx-auto w-[80%] flex flex-col items-center ">
        <div className="flex w-full items-center justify-center">
          <FaMusic className=" text-purple-500 text-lg" />
          <h1 className=" text-[1.8rem] font-bold text-white ml-2">Waveform</h1>
        </div>
        <h2 className="text-[1.5rem] font-bold">Create Account</h2>
        <p className=" text-[#9CA3AF] font-normal text-[0.9rem]">
          start your musical journey today
        </p>
        <div className=" my-6 rounded-2xl bg-white/5 p-6 ">
          <form
            noValidate
            onSubmit={handleSubmit}
            className=" flex flex-col justify-center mt-2 w-[100%]"
          >
            <InputFields
              handleEmail={handleEmail}
              input={input}
              setInput={setInput}
              error={error}
              empty={emptyInput}
            />
            <div className="input-fields mx-auto">
              <label>Confirm Password</label> <br />
              <div>
                <FaLock />
                <input
                  type={showConfirmPassword === true ? "text" : "password"}
                  placeholder="........."
                  value={input.confirmPassword}
                  onChange={(e) => {
                    setInput((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }));
                  }}
                  className="placeholder:text-[2.5rem] placeholder:tracking-tighter"
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                >
                  <FaEye />
                </button>
              </div>
              {emptyInput.confirmPassword === true && (
                <p className="text-red-400 text-[0.7rem] -mt-3 mb-3">
                  Password is required
                </p>
              )}
              {error.confirmPassword === true && (
                <p className="text-red-400 text-[0.65rem] -mt-3 mb-3">
                  Invalid Password
                </p>
              )}
            </div>
            <div className="w-full">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              <span className="text-[#9CA3AF] text-[0.9rem] ml-2">
                I agree to the{" "}
                <NavLink to="/" className="text-[#3B82F6]">
                  Terms of Service
                </NavLink>{" "}
                and{" "}
                <NavLink to="/" className="text-[#3B82F6]">
                  Privacy Policy
                </NavLink>
              </span>
            </div>
            {error.checked === true && (
              <p className="text-red-400 text-[0.7rem] mt-0 mb-3">
                You must agree before submitting.
              </p>
            )}
            <button className="mx-auto py-3 w-full rounded-2xl mt-4 font-700 text-[1.1rem] text-white bg-[#3B82F6]">
              Create Account
            </button>
          </form>

          <div className="flex gap-2 items-center justify-center mt-2">
            <div className="border-t border-[#9CA3AF]/2 w-[30%]"></div>
            <span className="text-[#9CA3AF] text-[0.9rem] px-2 bg-[#394353] rounded-sm">
              or continue with
            </span>
            <div className="border-b w-[30%]"></div>
          </div>

          <div className=" flex gap-7 mt-10 justify-center items-center">
            <button className="bg-[#485469] flex justify-center gap-2 items-center py-2 rounded-lg w-[50%]">
              <FaChrome className="text-[1.2rem]" />
              <span>Google</span>
            </button>

            <button className="bg-[#485469] flex justify-center gap-2 items-center py-2 w-[50%] rounded-lg">
              <FaApple className="text-[1.3rem]" />
              <span>Apple</span>
            </button>
          </div>
          <div className="text-[0.9rem] text-center font-400 mt-5 mb-8">
            Already have an account?{" "}
            <NavLink to="/login" className="text-[#3B82F6]">
              Signin
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
