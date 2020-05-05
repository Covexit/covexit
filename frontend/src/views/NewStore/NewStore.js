import React from 'react';

import { Redirect, Route, Switch } from "react-router-dom";

import ViewWrappers from "components/ViewWrappers/ViewWrappers";
import Button from "components/Button/Button";
import Form from "components/Form/Form";
import PersonalForm from './PersonalForm';
import BusinessForm from './BusinessForm';
import { useUserContext } from 'context/UserContext';
import { useTranslation } from 'react-i18next';
import './NewStore.scss';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';


const NewStore = (props) => {
  const [t] = useTranslation('new-store');
  const match = props.match;
  const { isAuthenticated } = useUserContext();

  return (
    <Switch>
      {/* create a business */}
      <PrivateRoute path={`${match.path}/business`} component={BusinessForm}/>
      {/* create an owner */}
      <Route path={`${match.path}/owner`} render={(props) => {
        return isAuthenticated ? <Redirect to={`${match.path}/business`}/> :
          <PersonalForm {...props} />
      }}/>
      {/* initial view */}
      <Route path={match.path}>
        {isAuthenticated && <Redirect to={`${match.path}/business`}/>}
        <ViewWrappers.View container withPadding>
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
        </ViewWrappers.View>
      </Route>
    </Switch>
  );
};

export default NewStore
