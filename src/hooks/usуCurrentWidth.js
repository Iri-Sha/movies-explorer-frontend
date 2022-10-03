import React from "react";

const useCurrentWidth = () => {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    let timeoutId = null;

    const resizeListener = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => setWidth(window.innerWidth), 150);
    };
    
    window.addEventListener('resize', resizeListener);

    return () => {
        window.removeEventListener('resize', resizeListener);
    }
  }, []);

  return width;
};

export default useCurrentWidth;