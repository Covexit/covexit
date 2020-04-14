import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import API from '../shared/api';
import ViewWrappers from '../components/ViewWrappers/ViewWrappers';
import { useUserContext } from '../context/UserContext';

function Verify({ match }) {
  const [isVerified, setIsVerified] = useState(0);
  const { id, token } = match.params;
  const { setVerified } = useUserContext();

  useEffect(() => {
    (async () => {
      if (id && token) {
        try {
          await API.verify.post({ user_id: id, verification_key: token});
          setIsVerified(1);
          setVerified(true);
        }
        catch (e) {
          console.error(e);
          setIsVerified(-1);
        }
      }
    })(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ViewWrappers.View withPadding>
      <div>
        {!isVerified && <Loader/>}
        {isVerified === 1 && <div className="Intro"><h1>Successfully verified</h1><p>Everything went right.</p></div>}
        {isVerified === -1 && <div className="Intro"><h1>Something went wrong.</h1></div>}
      </div>
    </ViewWrappers.View>
  )
}

export default Verify;
