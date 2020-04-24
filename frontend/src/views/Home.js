import React from 'react';
import Button from '../components/Button/Button';
import ViewWrappers from "../components/ViewWrappers/ViewWrappers";
import Map from "../components/Map/Map";

import './Home.scss';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const [t] = useTranslation('home');
  return (
    <ViewWrappers.View>
      <ViewWrappers.ViewSplitter small>
        <div className="Home">
          <div className="Intro">
            <h1>{t('head')}</h1>
            <p>{t('text')}</p>
          </div>

          <div className="Btn-group">
            <Button to="/stores" label={t('searchButton')}/>
            <Button to="/stores/new" label={t('registerButton')} secondary/>
          </div>
        </div>
      </ViewWrappers.ViewSplitter>
      <ViewWrappers.ViewSplitter omitOnMobile>
        <Map/>
      </ViewWrappers.ViewSplitter>
    </ViewWrappers.View>
  )
};

export default Home
