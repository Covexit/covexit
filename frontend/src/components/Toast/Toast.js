import React from 'react';
import { useHistory } from "react-router-dom";

import './Toast.scss';
import { useToastContext } from 'context/ToastContext';


function Toast() {
  const { toast, setToast } = useToastContext();
  const history = useHistory();

  history.listen(() => {
    if (toast.message)
      setToast({ message: null})
  })

  return !toast.message ? null : (
    <div className={`Toast Toast--${toast.type}`}>
      {toast.message}
    </div>
  );
}

export default Toast;
