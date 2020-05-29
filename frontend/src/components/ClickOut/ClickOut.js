import React, { useRef, useEffect } from 'react'

const ClickOut = ({
  children,
  onClickOut,
}) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOut (event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClickOut(event);
      }
    };

    document.addEventListener('mousedown', handleClickOut);
    return () => document.removeEventListener('mousedown', handleClickOut);
  }, [onClickOut]);

  return (
    <div ref={wrapperRef}>
      {children}
    </div>
  );
};

export default ClickOut
