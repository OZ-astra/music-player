import React from "react";
import { useState } from "react";
import { FaEnvelope, FaLock, FaEye } from "react-icons/fa";
type InputFieldsProps = {
  input: { [key: string]: string };
  setInput: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
      confirmPassword: string;
    }>
  >;
  empty: { [key: string]: boolean };
  error: { [key: string]: boolean };

  handleEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const InputFields = ({
  handleEmail,
  input,
  setInput,
  empty,
  error,
}: InputFieldsProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="input-fields mx-auto">
      <label>Email</label> <br />
      <div>
        <FaEnvelope />
        <input
          type="email"
          placeholder="your@email.com"
          value={input.email}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </div>
      {empty.email === true && (
        <p className="text-red-400 text-[0.7rem] -mt-3 mb-3">
          Email is required
        </p>
      )}
      {error.email === true && (
        <p className="text-red-400 text-[0.7rem] -mt-3 mb-3">Invalid Email</p>
      )}
      <label>Password</label> <br />
      <div>
        <FaLock />
        <input
          type={showPassword === true ? "text" : "password"}
          placeholder="........."
          value={input.password}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, password: e.target.value }))
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
      {empty.password === true && (
        <p className="text-red-400 text-[0.7rem] -mt-3 mb-3">
          Password is required
        </p>
      )}
      {error.password === true && (
        <p className="text-red-400 text-[0.65rem] -mt-3 mb-3">
          Password must be at least 8 characters, include a number and a special
          character
        </p>
      )}
    </div>
  );
};

export default InputFields;
