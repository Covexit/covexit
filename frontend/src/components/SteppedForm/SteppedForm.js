import TextInput from "../TextInput/TextInput";
import React from "react";

import './SteppedForm.scss'
import Stepper from "../Stepper/Stepper";

const SteppedForm = ({inputs, onChange, stepperProps, head, body, footer}) => {
  const renderedInputs = inputs &&
    inputs.map((e) =>
      <TextInput {...e} onChange={onChange} key={e.name}/>);

  const stepper = stepperProps && <Stepper {...stepperProps}/>;

  return (
    <div className="SteppedForm">
      <div className="SteppedForm-head Intro">{head}</div>
      <div className="SteppedForm-body">
        {renderedInputs || body}
      </div>
      <div className="SteppedForm-footer">{stepper}{footer}</div>
    </div>
  );
};
export default SteppedForm;
