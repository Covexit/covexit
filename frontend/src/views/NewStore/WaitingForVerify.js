import React from 'react';
import { useTranslation } from 'react-i18next';


const WaitingForVerify = () => {
  const [t] = useTranslation('account')
  return (
    <div className="Intro">
      <h1>{t('verifyHead')}</h1>
      <p>{t('verifyText')}</p>
    </div>
  );
};

export default WaitingForVerify;
