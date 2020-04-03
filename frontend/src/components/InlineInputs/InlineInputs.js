import React, { useState } from 'react'

import Button from "../Button/Button";
import Fields from "../Fields/Fields";


const InlineInputs = ({ values, addLabel, onAdd, onChange }) => {
  return (
    <div className="InlineInputs">
      {values.map((e, i) => <Fields.TextInput value={e} key={i} onChange={(event) => onChange(event.target.value, i)}/>)}
      <Button label={addLabel} secondary onClick={onAdd}/>
    </div>
  );
};

export default InlineInputs
