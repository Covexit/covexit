import TextInput from "../TextInput/TextInput";
import React from "react";

import './SteppedForm.scss'
import Stepper from "../Stepper/Stepper";

const SteppedForm = (props) => {
  const inputs = props.inputs &&
    props.inputs.map((e) =>
      <TextInput {...e} onChange={props.onChange} key={e.name}/>);

  const stepper = props.stepperProps && <Stepper {...props.stepperProps}/>;

  return (
    <div className="SteppedForm">
      <div className="SteppedForm-head Intro">{props.head}</div>
      <div className="SteppedForm-body">
        {inputs || props.body}
      </div>
      <div className="SteppedForm-footer">{stepper}{props.footer}</div>
    </div>
  );
};
export default SteppedForm;
