import { useEffect, useState } from "react";

export function useScrollPosition() {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsBottom(
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight
      );
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { isBottom };
}
