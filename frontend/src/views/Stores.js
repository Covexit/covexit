import React from 'react';
import ViewWrappers from "../components/ViewWrappers/ViewWrappers";
import Map from "../components/Map/Map";

import { matchPath, Route } from 'react-router-dom';
import Store from './Store';
import StoreList from '../components/StoreList/StoreList';
import { StoreListProvider } from 'context/StoreListContext';

const Stores = ({ location, match }) => (
  <ViewWrappers.View>
    <StoreListProvider>
      <ViewWrappers.ViewSplitter size="xs" omitOnMobile>
        <StoreList />
      </ViewWrappers.ViewSplitter>
      <ViewWrappers.ViewSplitter omitOnMobile={!!matchPath(location.pathname, { path: "/stores/:id", exact: true })}>
        <Map/>
      </ViewWrappers.ViewSplitter>
      <Route path={`${match.path}/:id`} render={(props => (
        <ViewWrappers.ViewSplitter size="xs">
          <Store {...props} />
        </ViewWrappers.ViewSplitter>
      ))}>
      </Route>
    </StoreListProvider>
  </ViewWrappers.View>
);

export default Stores
