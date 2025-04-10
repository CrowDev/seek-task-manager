import { useState, useEffect } from "react";

const breakpoints = {
  tablet: 768,
  desktop: 1024,
};

const getBreakpoint = (width) => {
  if (width >= breakpoints.desktop) {
    return "desktop";
  }
  return "tablet";
};

export default function useBreakpoint() {
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
