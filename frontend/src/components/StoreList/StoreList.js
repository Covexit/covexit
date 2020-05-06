import React, { useState, useEffect } from 'react';
import './StoreList.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useApi from '../../shared/api';


const StoreList = () => {
  const [t] = useTranslation('store-list');
  const [stores, setStores] = useState([])
  const { API } = useApi();

  useEffect(() => {
    const getStores = async () => {
      const response = await API.partners.get()
      setStores(response.data);
    }
    getStores();

  }, [API])


  return (
    <section className="StoreList">
      <h1 className="StoreList-heading h3 high-emphasis">{t('heading')}</h1>

      <div className="StoreList-stores">
        {stores.map(store => (
          <Link key={store.id} to={`/stores/${store.id}`} className="StoreList-store">
            <div className="StoreList-store-img">
            <img src={`/photos/${store.image}`} alt="" />
            </div>
            <div className="StoreList-store-body">
              <h4>{store.name}</h4>
              <p>{store.description}</p>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
};

export default StoreList;
