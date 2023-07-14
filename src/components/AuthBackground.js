import { Box } from "@mui/material";
import { LoginBg } from "../expert/assets";
import { useEffect, useRef } from "react";

const AuthBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null, // Set to null to use the browser viewport as the root
      rootMargin: "0px", // Margin around the root (in this case, none)
      threshold: 0.1 // Percentage of the element's visibility required to trigger the callback
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // When the element is in the viewport, load the background image
          entry.target.style.backgroundImage = `url(${LoginBg})`;
          observer.unobserve(entry.target); // Stop observing once the image is loaded
        }
      });
    }, options);

    if (containerRef.current) {
      observer.observe(containerRef.current); // Start observing the container element
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current); // Stop observing when the component is unmounted
      }
    };
  }, []);

  return (
    <Box
      ref={containerRef}
      style={{
        height: "100vh",
        width: "100vw",
        position: "absolute",
        zIndex: 0,
        top: 0,
        left: 0,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100vw 100vh"
      }}
    />
  );
};

export default AuthBackground;
