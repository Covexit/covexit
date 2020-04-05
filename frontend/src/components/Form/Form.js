import React from "react";

import './Form.scss'
import Stepper from "../Stepper/Stepper";

const Form = ({stepperProps, head, body, footer}) => {
  const stepper = stepperProps && <Stepper {...stepperProps}/>;

  return (
    <form className="Form">
      <div className="Form-head Intro">{head}</div>
      <div className="Form-body">
        {body}
      </div>
      <div className="Form-footer">{stepper}{footer}</div>
    </form>
  );
};
export default Form;
