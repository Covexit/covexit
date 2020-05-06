import React from 'react';
import ViewWrappers from '../ViewWrappers/ViewWrappers';
import { useUserContext } from 'context/UserContext';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';


const PrivateRoute = (props) => {
  const { isAuthenticated } = useUserContext();
  const [t] = useTranslation('account')

  return isAuthenticated ? <props.component {...props} /> :
    <ViewWrappers.View container withPadding>
      <div className="Intro">
        <h1>{t('authenticationNeeded')}</h1>
        <p>
          <Trans i18nKey="authenticationNeededText" ns="account">
            You have to be signed in to access this page. If you have an account
            you can sign in <Link to="/login">here</Link>. Otherwise you can
            register as a store owner <Link to="/stores/new/">here</Link>.
          </Trans>
        </p>
      </div>
    </ViewWrappers.View>
}

export default PrivateRoute;
