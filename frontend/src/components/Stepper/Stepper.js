import React from "react";

import './Stepper.scss'

const Stepper = (props) => {
  const steps = Array.from({ length: props.count }).map(
    (e, i) =>
      <div key={i} className={'Stepper-index h1 ' + (props.activeIndex >= i + 1 && 'Stepper-index--active')}>{i + 1}</div>,
  );

  return (
    <div className="Stepper">
      <div className="Stepper-steps">
        {steps}
        <div className="Stepper-indicator" style={{ width: `${(props.activeIndex - 1) / (props.count - 1) * 100}%` }}/>
      </div>
    </div>
  );
};

export default Stepper;
