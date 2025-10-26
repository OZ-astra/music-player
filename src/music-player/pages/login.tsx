import { useEffect, useRef, useState } from "react";
export default function Login() {
  const countRef = useRef(0);
  const [searchTerm, setSearchTerm] = useState(" ");
  useEffect(() => {
    countRef.current = countRef.current + 1;
  });

  return (
    <>
      ,..
      {countRef.current}
    </>
  );
}
