import React from 'react';
import ViewWrappers from "../components/ViewWrappers/ViewWrappers";
import Map from "../components/Map/Map";

import { matchPath, Route } from 'react-router-dom';
import Store from './Store';

const StoreList = ({ location, match }) => (
  <ViewWrappers.View>
    <ViewWrappers.ViewSplitter small omitOnMobile>
      StoreList
    </ViewWrappers.ViewSplitter>
    <ViewWrappers.ViewSplitter omitOnMobile={!!matchPath(location.pathname, { path: "/stores/:id", exact: true })}>
      <Map/>
    </ViewWrappers.ViewSplitter>
      <Route path={`${match.path}/:id`}>
        <ViewWrappers.ViewSplitter small>
          <Store />
        </ViewWrappers.ViewSplitter>
      </Route>
  </ViewWrappers.View>
);

export default StoreList
