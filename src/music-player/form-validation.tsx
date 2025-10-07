export default function signup() {
  return (
    <div className="border-4 border-blue-700 mx-auto flex w-[80%] ">
      <form className="">
        <div>
          <label htmlFor="name">Name</label> <br />
          <input type="text" name="name" />
        </div>
        <div>
          <label htmlFor="email">E-mail</label>
          <br />
          <input type="email" name="email" />
        </div>

        <div>
          <label htmlFor="password">Password</label> <br />
          <input type="password" name="password" />
        </div>
      </form>
    </div>
  );
}
