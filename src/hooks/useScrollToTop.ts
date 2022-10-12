import { useEffect, useState } from "react";

const SCROLL_DISTANCE = 100;

const useScrollToTop = (id: string) => {
  const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false);
  useEffect(() => {
    const element = document.getElementById(id);
    if (!element) {
      return;
    }
    const onScroll = () => {
      setShowScrollToTop(element.scrollTop > SCROLL_DISTANCE);
    };

    element.addEventListener("scroll", onScroll);

    return () => element.removeEventListener("scroll", onScroll);
  }, [id]);

  return showScrollToTop;
};

export default useScrollToTop;
