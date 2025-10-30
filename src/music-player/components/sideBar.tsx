import { FaHome, FaSearch, FaHeart, FaBook } from "react-icons/fa";

export default function SideBar() {
  return (
    <div className="sideBar">
      <button>
        <FaHome /> <span>Home</span>
      </button>
      <button>
        <FaSearch />
        Search
      </button>
      <button>
        <FaHeart /> liked
      </button>
      <button>
        <FaBook /> Library
      </button>
    </div>
  );
}
