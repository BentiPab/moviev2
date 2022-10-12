import { useEffect, useState } from "react";

const MOBILE_WIDTH = 480;

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>();
  useEffect(() => {
    const handleResize = () => {
      const width = window.screen.availWidth;
      setIsMobile(width <= MOBILE_WIDTH);
      return;
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
