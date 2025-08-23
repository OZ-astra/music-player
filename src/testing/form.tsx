import { useState } from "react";
import "./styles.css";

export default function Form() {
  const [name, setName] = useState(null);
  return (
    <div className="">
      <form action="" className="border-4 w-[60%] mx-auto mt-12">
        <label htmlFor="name">First Name</label> <br />
        <input type="text" />
        <br />
        <label htmlFor="name">Last Name</label> <br />
        <input type="text" /> <br />
        <label htmlFor="mail">Email</label>
        <br />
        <input type="email" />
        <br />
        <label htmlFor="passkey">Password</label> <br />
        <input type="password" />
        <br />
        <div className="flex gap-6">
          <div className="flex gap-2">
            <p>this</p>

            <input type="checkbox" value="" />
          </div>
          <p>OR</p>
          <div className="flex gap-2">
            <p>that</p>
            <input type="checkbox" />
          </div>
        </div>
        <select name="selection" id="selection">
          <option value="">Cars</option>
          <option value="">Lexus</option>
          <option value="">toyota</option>
          <option value="">honda</option>
          <option value="">BMW</option>
          <option value="">Mercerdes</option>
        </select>
      </form>
    </div>
  );
}
