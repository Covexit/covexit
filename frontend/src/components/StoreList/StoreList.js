import React, { useState, useEffect } from 'react';
import { businessImages } from '../../shared/businessImages'
import './StoreList.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import API from '../../shared/api';


const StoreList = () => {
  const [t] = useTranslation('store-list');
  const [stores, setStores] = useState([])

  useEffect(() => {
    const getStores = async () => {
      let partners = []
      const response = await API.partners.get()
      response.data.map(store => {
        return partners.push({
          id: store.id,
          name: store.name,
          desc: store.description
        })
      })
      setStores(partners);
    }
    getStores();

  })
  // [
  //   { name: 'Manfreds Bakery', desc: 'A mix of some flourish stuff and water, plus some salty crystals looking like salt...' },
  //   { name: 'BlueMen', desc: 'A mix of some flourish stuff and water, plus some salty crystals looking like salt...' },
  //   { name: 'DanyOils', desc: 'A mix of some flourish stuff and water, plus some salty crystals looking like salt...' },
  // ];


  return (
    <section className="StoreList">
      <h1 className="StoreList-heading h3 high-emphasis">{t('heading')}</h1>

      <div className="StoreList-stores">
        {stores.map((e, i) => (
          <Link key={i} to={`/stores/${i + 1}`} className="StoreList-store">
            <div className="StoreList-store-img">
              <img src={`/photos/${businessImages[i]}`} alt="" />
            </div>
            <div className="StoreList-store-body">
              <h4>{e.name}</h4>
              <p>{e.desc}</p>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
};

export default StoreList;
