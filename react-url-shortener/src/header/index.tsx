import { useState, useEffect } from "react";
import { GenericMenu } from "../GenericMenu";
import { MenuMoba } from "../MenuMoba";

export function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    // cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? <MenuMoba /> : <GenericMenu />}
    </>
  );
}
