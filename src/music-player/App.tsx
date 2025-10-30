import "./styles.css";
import Home from "./pages/Home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import MainHomePage from "./pages/mainHome"
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
export default function MusicPlayer() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="mainHome" element={<MainHomePage/>}/>
      </Route>
    )
  );

  return (
    <div className="bg-[linear-gradient(to_right,_#00000A_5%,_#040314_95%)] ">
      <RouterProvider router={router} />
      {/* <MainHomePage/> */}
    </div>
  );
}
