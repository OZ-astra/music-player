import largeImages from "./data.js";

export default function Ecommerce() {
  return (
    <div>
      <header className="border border-red-500">
        <div className=" bg-[gold] rounded-b-2xl flex justify-between px-4 pt-5 pb-2 ">
          <img
            src="./commerceAssets/logo.jpg"
            alt="logo"
            className="w-12 h-12 rounded-[50%]"
          />
          <button>
            <img
              src="./commerceAssets/icons/menu.svg"
              alt="menu icon"
              className="w-10"
            />
          </button>
        </div>
        <div>
          {largeImages.map((image, index) => {
            return (
              <div>
                <img src={image} alt="" />
              </div>
            );
          })}
        </div>
      </header>
    </div>
  );
}
