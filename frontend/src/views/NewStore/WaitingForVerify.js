import React from 'react';
import { useTranslation } from 'react-i18next';
import ViewWrappers from '../../components/ViewWrappers/ViewWrappers';


const WaitingForVerify = () => {
  const [t] = useTranslation('account')
  return (
    <ViewWrappers.View container withPadding>
      <div className="Intro">
        <h1>{t('verifyHead')}</h1>
        <p>{t('verifyText')}</p>
      </div>
    </ViewWrappers.View>
  );
};

export default WaitingForVerify;
