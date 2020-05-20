import React from "react";

import './Form.scss'
import Stepper from "../Stepper/Stepper";

const Form = ({stepperProps, head, body, footer, onSubmit, errors}) => {
  const stepper = stepperProps && <Stepper {...stepperProps}/>;

  return (
    <form className="Form" onSubmit={onSubmit}>
      <div className="Form-head Intro">{head}</div>
      <div className="Form-body">
        {body}
      </div>
      {errors && <div className="Form-errors">
        {errors}
      </div>}
      <div className="Form-footer">{stepper}{footer}</div>
    </form>
  );
};
export default Form;
