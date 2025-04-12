import { useState, useEffect } from "react";
import { breakpoints } from "@/utils/constants";

const getBreakpoint = (width) => {
  if (width >= breakpoints.desktop) {
    return "desktop";
  }
  return "tablet";
};

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(() =>
    getBreakpoint(window.innerWidth),
  );

  useEffect(() => {
    const handleResize = () => {
      const newBreakpoint = getBreakpoint(window.innerWidth);
      setBreakpoint(newBreakpoint);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
}
