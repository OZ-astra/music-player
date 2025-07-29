import { useEffect, useState } from "react";
import "./styles.css";

export default function Homepage() {
  const [hide, setHide] = useState(false);
  const [dropDown, setDropDown] = useState({
    feature: false,
    company: false,
  });
  const [activeTab, setActiveTab] = useState<"login" | "register" | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(true);

  function handleHide() {
    setHide((prev) => !prev);
  }

  function handleDropDown(section: "feature" | "company") {
    setDropDown((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  function handleTabToggle(tab: "login" | "register") {
    setActiveTab(tab);
  }

  useEffect(() => {
    const checkScreen = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const featuresDrop = ["Todo List", "Calendar", "Reminders", "Planning"];
  const companyDrop = ["History", "our Team", "Blog"];
  const featureDropImages = [
    "./images/icon-todo.svg",
    "./images/icon-calendar.svg",
    "./images/icon-reminders.svg",
    "./images/icon-planning.svg",
  ];
  return (
    <div className="w-full h-full relative z-1">
      <header className="flex align-middle justify-between md:justify-normal md:gap-[5px] mt-5 px-4 md:w-[100%]">
        <h1 className="text-4xl md:w-[15%]">snap</h1>
        <div>
          {!hide && isSmallScreen ? (
            <button onClick={() => handleHide()}>
              <img
                src="images/icon-menu.svg"
                alt="menu"
                className="mt-2 md:w-[100%] md:hidden"
              />
            </button>
          ) : (
            <div
              className={`bg-white absolute -mt-5 z-2 inset-0 left-36 md:left-0 md:w-[80vw] ${
                isSmallScreen ? "" : "relative left-0 mt-0"
              }`}
            >
              <button
                onClick={() => handleHide()}
                className="mt-3 grid w-full md:hidden"
              >
                <img
                  src="./images/icon-close-menu.svg"
                  alt="close menu"
                  className="justify-self-end"
                />
              </button>
              <div className="w-full md:w-[100%] md:flex md:justify-between md:text-sm  md:align-middle">
                <div className=" mt-12 flex flex-col gap-3 text-[hsl(0,0%,41%)] pl-6 md:flex-row md:mt-3 w-80 md:justify-between md:w-[500px]">
                  <div className="">
                    <div className="flex align-middle gap-3]">
                      <p className="nav-link">Features</p>
                      <button
                        onClick={() => {
                          handleDropDown("feature");
                        }}
                      >
                        <img
                          src={
                            dropDown.feature
                              ? "./images/icon-arrow-up.svg"
                              : "./images/icon-arrow-down.svg"
                          }
                          alt="open and close features"
                          className="ml-2"
                        />
                      </button>
                    </div>
                    <ul
                      className={`w-full md:w-[20vw] md:-ml-16 md:pl-3 bg-white flex flex-col justify-start gap-4 mt-6 ml-4 ${
                        dropDown.feature ? "text-[1rem]" : "hidden"
                      } ${
                        isSmallScreen
                          ? "lists-in-smscreens"
                          : "lists-in-mdscreens"
                      }`}
                    >
                      {featuresDrop.map((item, index) => {
                        return (
                          <li key={index} className="flex gap-2">
                            <img
                              src={featureDropImages[index]}
                              alt=""
                              className="w-6 h-6"
                            />
                            <span>{item}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className={`${dropDown.feature ? "mt-3 md:mt-0" : ""}`}>
                    <div className="flex align-middle gap-2">
                      <p className="nav-link">Company</p>
                      <button
                        onClick={() => handleDropDown("company")}
                        className="mt-1"
                      >
                        <img
                          src={
                            dropDown.company
                              ? "./images/icon-arrow-up.svg"
                              : "./images/icon-arrow-down.svg"
                          }
                          alt="open and close company"
                        />
                      </button>
                    </div>
                    <div
                      className={`w-full md:w-[15vw] md:pl-3 flex flex-col justify-start gap-4 mt-4 ml-4 ${
                        dropDown.company ? "text-[1rem]" : "hidden"
                      } ${
                        isSmallScreen
                          ? "lists-in-smscreens"
                          : "lists-in-mdscreens"
                      }`}
                    >
                      {companyDrop.map((item) => {
                        return (
                          <ul>
                            <li>{item}</li>
                          </ul>
                        );
                      })}
                    </div>
                  </div>
                  <div
                    className={`nav-link ${
                      dropDown.company ? "mt-3 md:mt-0" : ""
                    }`}
                  >
                    Careers
                  </div>

                  <div className="nav-link">About</div>
                </div>

                <div className=" w-52 mt-12 text-[hsl(0,0%,41%)] text-[0.9rem] flex flex-col m-auto md:mt-2 md:text-sm md:flex-row md:w-[50%] justify-end">
                  <button
                    onMouseOver={() => handleTabToggle("login")}
                    className={`nav-link  ${
                      activeTab === "login"
                        ? "border-2 md:border border-[hsl(0,0%,41%)]"
                        : ""
                    }`}
                    id="sigin-login-button"
                  >
                    Login
                  </button>
                  <br />
                  <button
                    onMouseOver={() => handleTabToggle("register")}
                    className={`nav-link${
                      activeTab === "register"
                        ? " border-2 md:border border-[hsl(0,0%,41%)]"
                        : ""
                    }`}
                    id="sigin-login-button"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      <section className="md:flex h-[100vh] lg:pl-10 lg:pr-14 pl-16">
        <div className="mt-7 md:w-[40%] md:h-[80%] md:order-2 md:mt-10">
          <img
            src="images/image-hero-mobile.png"
            alt=""
            className="md:hidden"
          />
          <img
            src="images/image-hero-desktop.png"
            alt=""
            className="sm:hidden"
          />
        </div>
        <div className="md:w-[60%] md:order-1 md:mt-48 d:pl-12 ">
          <div className="flex flex-col md:flex">
            <h1 className="text-4xl text-center mt-10 md:text-start md:text-6xl md:w-[80%]">
              Make remote work
            </h1>
            <p className=" mt-5 text-center text-[hsl(0,0%,41%)] text-[1.03rem] w-[90%] mx-auto md:mt-12 md:mx-0 md:text-start">
              Get your team in sync, no matter your location. Steamline
              processes, create team rituals, and watch productivity soar.
            </p>
            <div className="flex justify-center md:justify-start">
              <button className="bg-[hsla(0,33%,1%,1.00)] text-white mt-16 text-md py-3 px-8 rounded-2xl md:mt-12">
                Learn more
              </button>
            </div>
          </div>
          <div className="flex justify-around mt-14 md:w-[90%] md:justify-between md:mt-32 lg:w-[78%]">
            <img
              src="images/client-databiz.svg"
              alt=""
              className="w-14 p-2 md:w-32 md:p-4 md:pl-0"
            />
            <img
              src="images/client-audiophile.svg"
              alt=""
              className="w-16 md:w-20 p-2"
            />
            <img
              src="images/client-meet.svg"
              alt=""
              className="w-20 p-2 md:w-24 md:p-3"
            />
            <img
              src="images/client-maker.svg"
              alt=""
              className="w-20 p-2 md:w-24 md:p-3"
            />
          </div>
        </div>
      </section>
      <p className="mt-5 text-[0.67rem]">
        coded by{" "}
        <a
          className="text-blue-300"
          href="https://github.com/OZ-astra/landin-page-with-dropDown"
        >
          Ozil
        </a>
      </p>
    </div>
  );
}
