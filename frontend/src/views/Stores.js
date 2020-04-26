import React from 'react';
import ViewWrappers from "../components/ViewWrappers/ViewWrappers";
import Map from "../components/Map/Map";

import { matchPath, Route } from 'react-router-dom';
import Store from './Store';
import StoreList from '../components/StoreList/StoreList';
import CompanyPage from './CompanyPage';

// todo: check with stateManagement if User is Owner of this company
const isOwner = false;

const Stores = ({ location, match }) => (
  <ViewWrappers.View>
    <ViewWrappers.ViewSplitter small omitOnMobil>
      <StoreList />
    </ViewWrappers.ViewSplitter>
    <ViewWrappers.ViewSplitter omitOnMobile={!!matchPath(location.pathname, { path: "/stores/:id", exact: true })}>
      <Map/>
    </ViewWrappers.ViewSplitter>
    <Route path={`${match.path}/:id`} render={(props => (
      <ViewWrappers.ViewSplitter small>
        {isOwner ? <CompanyPage /> : <Store {...props} />}
      </ViewWrappers.ViewSplitter>
    ))}>
    </Route>
  </ViewWrappers.View>
);

export default Stores
