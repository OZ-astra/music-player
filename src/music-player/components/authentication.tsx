import { auth, googleProvider, facebookProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaChrome } from "react-icons/fa";
export default function Auth() {
  const navigate = useNavigate();

  async function handleGoogleSignIn() {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleFacebookSignIn() {
    try {
      await signInWithPopup(auth, facebookProvider);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className=" flex gap-7 mt-6 justify-center items-center">
      <button
        onClick={handleGoogleSignIn}
        className="bg-[#485469] flex justify-center gap-2 items-center py-2 rounded-lg w-[50%]"
      >
        <FaChrome className="text-[1.2rem]" />
        <span>Google</span>
      </button>

      <button
        onClick={handleFacebookSignIn}
        className="bg-[#485469] flex justify-center gap-2 items-center py-2 w-[50%] rounded-lg"
      >
        <FaFacebook className="text-[1.3rem]" />
        <span>Facebook</span>
      </button>
    </div>
  );
}
