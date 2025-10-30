import React from "react";
import { useState, useReducer } from "react";
import { FaEnvelope, FaLock, FaEye } from "react-icons/fa";
const initialState = {
  email: "",
  password: "",
  error: false,
  empty: false,
  showPassword: false,
  loggedIn: false,
};

function reducerFunction(inputState, action) {
  switch (action.type) {
    case "SET_EMAIL":
      return {
        ...inputState,
        email: action.payload,
      };

    case "SET_PASS":
      return {
        ...inputState,
        password: action.payload,
      };

    case "EMPTY":
      return {
        ...inputState,
        empty: true,
        error: false,
        loggedIn: false,
      };

    case "ERROR":
      return {
        ...inputState,
        error: true,
        loggedIn: false,
        email: "",
        password: "",
      };

    case "LOGGED_IN":
      return {
        ...inputState,
        error: false,
        loggedIn: true,
      };
    default:
      return inputState;
  }
}
const InputFields = () => {
  const [inputState, dispatch] = useReducer(reducerFunction, initialState);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="input-fields mx-auto">
      <label>Email</label> <br />
      <div>
        <FaEnvelope />
        <input
          type="email"
          placeholder="your@email.com"
          value={inputState.email}
          onChange={(e) =>
            dispatch({ type: "SET_EMAIL", payload: e.target.value })
          }
        />
      </div>
      {/* {empty.email === true && (
        <p className="text-red-400 text-[0.7rem] -mt-3 mb-3">
          Email is required
        </p>
      )}
      {error.email === true && (
        <p className="text-red-400 text-[0.7rem] -mt-3 mb-3">Invalid Email</p>
      )} */}
      <label>Password</label> <br />
      <div>
        <FaLock />
        <input
          type={showPassword === true ? "text" : "password"}
          placeholder="........."
          value={inputState.password}
          onChange={(e) =>
            dispatch({ type: "SET_EMAIL", payload: e.target.value })
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
      {/* {empty.password === true && (
        <p className="text-red-400 text-[0.7rem] -mt-3 mb-3">
          Password is required
        </p>
      )}
      {error.password === true && (
        <p className="text-red-400 text-[0.65rem] -mt-3 mb-3">
          Password must be at least 8 characters, include a number and a special
          character
        </p>
      )} */}
    </div>
  );
};

export default InputFields;
