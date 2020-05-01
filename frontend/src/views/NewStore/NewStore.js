import React from 'react';

import { Redirect, Route, Switch } from "react-router-dom";

import ViewWrappers from "components/ViewWrappers/ViewWrappers";
import Button from "components/Button/Button";
import Form from "components/Form/Form";
import PersonalForm from './PersonalForm';
import BusinessForm from './BusinessForm';
import WaitingForVerify from './WaitingForVerify';
import { useUserContext } from 'context/UserContext';
import { useTranslation } from 'react-i18next';
import './NewStore.scss';


const NewStore = (props) => {
  const [t] = useTranslation('new-store');
  const match = props.match;
  const { isVerified, isAuthenticated } = useUserContext();

  return (
    <ViewWrappers.View container withPadding>
      {!isVerified && isAuthenticated ? <WaitingForVerify /> :
        <Switch>
          {/* create a business */}
          <Route path={`${match.path}/business`} component={BusinessForm} />
          {/* create an owner */}
          <Route path={`${match.path}/owner`} render={(props) => {
            return isVerified ? <Redirect to={`${match.path}/business`} /> : <PersonalForm {...props} />
          }}/>
          {/* initial view */}
          <Route path={match.path}>
            {isVerified && <Redirect to={`${match.path}/business`} />}
            <Form
              head={<>
                <h1>{t('head')}</h1>
                <p>{t('text')}</p>
              </>}
              footer={<>
                <div className="Btn-group">
                  <Button label={t('signUpGoogle')} to={{ pathname: `${match.path}/owner`, state: { useGoogle: true } }}/>
                  <Button label={t('signUpManually')} to={{ pathname: `${match.path}/owner`, state: { useGoogle: false } }} secondary/>
                </div>
              </>}
            />
          </Route>
        </Switch>
      }
    </ViewWrappers.View>
  );
};

export default NewStore
