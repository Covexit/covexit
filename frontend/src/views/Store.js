import React, { useState, useEffect } from 'react';

import Footer from '../components/Footer/Footer';
import Button from '../components/Button/Button';
import ProductList from '../components/ProductList/ProductList';

import { useTranslation } from 'react-i18next';

import './Store.scss';
import products from '../shared/productData.js';
import API from '../shared/api';
import { useUserContext } from '../context/UserContext';
import Tab from '../components/Tab/Tab';

const Store = ({ match }) => {
  const [t] = useTranslation(['store-detail', 'account']);
  const { partners, logoutSuccess } = useUserContext();
  const [store, setStore] = useState({
    name: ''
  });
  const { id } = match.params;
  const ownsStore = partners.some(partner => partner === parseInt(id));

  useEffect(() => {
    const getPartner = async () => {
      const response = await API.partners.get(id);
      setStore(response.data);
    };

    getPartner();
  }, [ id ]);
  return (
    <div className="Store">
      <section className="Store-showcase">
        <div className="Store-image">
          <img src={`/photos/${store.image}`} alt="" style={{ width: "100%" }} />
        </div>
        <article className="Store-Details">
          <h1 className="high-emphasis h4 text-capitalize">{store.name}</h1>
          <p className="Store-Detail">{store.description}</p>
        </article>
      </section>

      <section className="Store-actions">
        {!ownsStore ?
          <Button label={t('store-detail:callButton')} onClick={() => window.open(`tel:${store.addresses[0].phone}`)} secondary/> :
          <>
            <Button span label={t('account:edit')} />
            <Button onClick={logoutSuccess} label={t('account:logout')} secondary />
            <Button to={`${match.url}/product`} label={t('account:addProduct')} secondary />
            <Button to={`${match.url}/product`} label={t('account:manageProduct')} secondary />
          </>
        }
      </section>

      {ownsStore ? <Tab /> : ''}

      <ProductList products={products} type="add" />
      <Footer />
    </div>
  );
}

export default Store;
