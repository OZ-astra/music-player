import { auth } from "../config/firebase";
import Auth from "../components/authentication";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "../styles.css";
import {
  FaMusic,
  FaLock,
  FaEnvelope,
  FaEye,
  FaArrowLeft,
} from "react-icons/fa";
import { useNavigate, NavLink } from "react-router-dom";
import { useReducer, useState } from "react";

type stateType = {
  email: string;
  password: string;
  confirmPassword: string;
  error: {
    email: string | boolean;
    password: string | boolean;
    confirmPassword: string | boolean;
  };
};

type Action = {
  type: "SET_FIELD" | "SET_ERROR" | "CLEAR_ERROR" | "LOGGED_IN";
  field: keyof stateType;
  value?: string;
  message?: string | boolean;
};

const initialState: stateType = {
  email: "",
  password: "",
  confirmPassword: "",
  error: {
    email: false,
    password: false,
    confirmPassword: false,
  },
};

function reducerFunction(inputState: stateType, action: Action): stateType {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...inputState,
        [action.field]: action.value,
      };

    case "SET_ERROR":
      return {
        ...inputState,
        error: {
          ...inputState.error,
          [action.field]: action.message,
        },
      };

    case "CLEAR_ERROR":
      return {
        ...inputState,
        error: {
          ...inputState.error,
          [action.field]: "",
        },
      };

    // case "SUCCESS":
    // return {
    //   ...inputState,
    //   email: "",
    //   password:"",
    //   confirmPassword:"",
    //   isChecked:"",
    //   loggedIn: true,
    // };

    default:
      return inputState;
  }
}
export default function signup() {
  const [inputState, dispatch] = useReducer(reducerFunction, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [checkError, setCheckError] = useState(false);
  const [authError, setAuthError] = useState(false);
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  function handleIsCheckedChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsChecked(e.target.checked);
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        inputState.email,
        inputState.password
      );
      console.log(auth?.currentUser?.email);
    } catch (err: unknown) {
      if (!(err instanceof Error)) return;
      console.error(err);
      if (err.message.includes("auth/email-already-in-use")) {
        setAuthError(true);
      } else {
        setAuthError(false);
      }
    }

    function validate() {
      try {
        if (inputState.email === "") {
          throw new Error("Email is required");
        } else {
          if (emailRegex.test(inputState.email)) {
            dispatch({ type: "CLEAR_ERROR", field: "email" });
          } else {
            throw new Error("Invalid Email");
          }
        }
      } catch (err: unknown) {
        if (!(err instanceof Error)) return;
        dispatch({ type: "SET_ERROR", field: "email", message: err.message });
        console.log(err.message);
      }
      try {
        if (inputState.password === "") {
          throw new Error("Password is required");
        } else {
          if (inputState.password.length >= 6) {
            dispatch({ type: "CLEAR_ERROR", field: "password" });
          } else {
            throw new Error("Invalid password");
          }
        }
      } catch (err: unknown) {
        if (!(err instanceof Error)) return;
        dispatch({
          type: "SET_ERROR",
          field: "password",
          message: err.message,
        });
        console.log(err.message);
      }

      try {
        if (inputState.confirmPassword === "") {
          console.log("am empty");
          throw new Error("Password is required");
        } else {
          if (inputState.confirmPassword !== inputState.password) {
            throw new Error("Invalid Password");
          } else {
            dispatch({ type: "CLEAR_ERROR", field: "confirmPassword" });
          }
        }
      } catch (err: unknown) {
        if (!(err instanceof Error)) return;
        dispatch({
          type: "SET_ERROR",
          field: "confirmPassword",
          message: err.message,
        });
        console.log("password");
      }
    }

    if (!isChecked) {
      setCheckError(true);
    } else {
      setCheckError(false);
    }
    validate();

    const isFormValid =
      !inputState.error.email &&
      !inputState.error.password &&
      !inputState.error.confirmPassword &&
      isChecked &&
      authError;

    if (isFormValid) {
      console.log("form submitted");
      navigate("/");
    }
  }

  return (
    <div className="conic w-[100%] bg-gradient-to-br from-[#121212] via-[#1a1a2e] to-[#16213e] flex flex-col justify-center ">
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
            <div className="input-fields mx-auto">
              <label>Email</label> <br />
              <div>
                <FaEnvelope />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={inputState.email}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FIELD",
                      field: "email",
                      value: e.target.value,
                    })
                  }
                />
              </div>
              {inputState.error.email && (
                <p className="text-red-400 text-[0.7rem] -mt-3 mb-3">
                  {inputState.error.email}
                </p>
              )}
              {authError && (
                <p className="text-red-400 text-[0.7rem] -mt-3 mb-3">
                  email is already in use
                </p>
              )}
              <label>Password</label> <br />
              <div>
                <FaLock />
                <input
                  type={showPassword === true ? "text" : "password"}
                  placeholder="........."
                  value={inputState.password}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FIELD",
                      field: "password",
                      value: e.target.value,
                    })
                  }
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
              {inputState.error.password && (
                <p className="text-red-400 text-[0.7rem] -mt-3 mb-3">
                  {inputState.error.password}
                </p>
              )}
              <label>Confirm Password</label> <br />
              <div>
                <FaLock />
                <input
                  type={showConfirmPassword === true ? "text" : "password"}
                  placeholder="........."
                  value={inputState.confirmPassword}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FIELD",
                      field: "confirmPassword",
                      value: e.target.value,
                    })
                  }
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
              {inputState.error.confirmPassword && (
                <p className="text-red-400 text-[0.7rem] -mt-3 mb-3">
                  {inputState.error.confirmPassword}
                </p>
              )}
            </div>
            <div className="w-full">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleIsCheckedChange}
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
            {checkError && (
              <p className="text-red-400 text-[0.7rem] mb-3">
                you must agree to terms
              </p>
            )}
            <button
              type="submit"
              className="mx-auto py-3 w-full rounded-2xl mt-4 font-700 text-[1.1rem] text-white bg-[#3B82F6] shadow-md hover:shadow-[#3B82F6]"
            >
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

          <Auth />
          <div className="text-[0.9rem] text-center font-400 mt-5 mb-8">
            Already have an account?{" "}
            <NavLink to="/login" className="text-[#3B82F6]">
              Signin
            </NavLink>
          </div>
        </div>
        <button
          onClick={() => navigate("/")}
          className="mb-10 flex items-center gap-2 text-[0.7rem] font-300 text-[#9CA3AF]"
        >
          <FaArrowLeft />
          <span>Back to home</span>
        </button>
      </div>
    </div>
  );
}
