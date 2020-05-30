import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { TrackJS } from 'trackjs';
import 'index.scss';
import App from './app/App';
import * as serviceWorker from 'serviceWorker';
import { BrowserRouter } from "react-router-dom";
import Loader from './components/Loader/Loader';
import './i18n';


let trackConfig = {
  network: { error: false },
}

if (process.env.NODE_ENV === 'production') {
  trackConfig = {
    ...trackConfig,
    token: "cb67429b695643aa8e0902fb9bdd2bf7",
    application: "covexit-prod"
  }
}

TrackJS.install(trackConfig);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Loader/>}>
        <App/>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
