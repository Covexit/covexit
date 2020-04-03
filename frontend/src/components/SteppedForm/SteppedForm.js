import React from "react";

import './SteppedForm.scss'
import Stepper from "../Stepper/Stepper";

const SteppedForm = ({stepperProps, head, body, footer}) => {
  const stepper = stepperProps && <Stepper {...stepperProps}/>;

  return (
    <div className="SteppedForm">
      <div className="SteppedForm-head Intro">{head}</div>
      <div className="SteppedForm-body">
        {body}
      </div>
      <div className="SteppedForm-footer">{stepper}{footer}</div>
    </div>
  );
};
export default SteppedForm;
