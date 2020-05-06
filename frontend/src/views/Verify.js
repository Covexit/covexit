import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import ViewWrappers from '../components/ViewWrappers/ViewWrappers';
import { useUserContext } from '../context/UserContext';
import useApi from '../shared/api';
import { useTranslation } from 'react-i18next';

function Verify({ match, history }) {
  const [isVerified, setIsVerified] = useState(0);
  const { id, token, type } = match.params;
  const { setVerified } = useUserContext();
  const [t] = useTranslation('account');
  const { API } = useApi();

  useEffect(() => {
    (async () => {
      if (id && token) {
        try {
          await API.verify.post({ user_id: id, verification_key: token}, type);
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

  useEffect(() => {
    if (isVerified === 1)
      setTimeout(() => history.push(type === 'waitinglist' ? '/' : '/stores/new/business'), 5000);
  }, [history, isVerified, type]);

  return (
    <ViewWrappers.View withPadding container>
      <div className="Intro">
        {!isVerified && <Loader/>}
        {isVerified === 1 && <><h1>{t('verifySuccessHead')}</h1><p>{t('verifySuccessText')}</p></>}
        {isVerified === -1 && <h1>{t('verifyFailed')}</h1>}
      </div>
    </ViewWrappers.View>
  )
}

export default Verify;
