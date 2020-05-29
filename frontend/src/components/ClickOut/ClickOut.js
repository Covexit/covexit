import React, { useRef, useEffect } from 'react'

const ClickOut = ({
  children,
  onClickOut,
}) => {
  const wrapperRef = useRef(null);
  const handleClickOut = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      onClickOut(event);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOut);
    return () => document.removeEventListener('mousedown', handleClickOut);
  }, []);

  return (
    <div ref={wrapperRef}>
      {children}
    </div>
  );
};

export default ClickOut