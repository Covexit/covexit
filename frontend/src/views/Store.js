import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiX } from 'react-icons/fi';

import { useUserContext } from '../context/UserContext';
import Button from '../components/Button/Button';
import ProductList from '../components/ProductList/ProductList';
import Tab from '../components/Tab/Tab';
import './Store.scss';
import { useMediaQuery } from 'react-responsive';
import useApi from '../shared/api';

const Store = ({ match, history }) => {
  const [t] = useTranslation(['store-detail', 'account']);
  const { partners, logoutSuccess } = useUserContext();
  const { API } = useApi();
  const [store, setStore] = useState({});
  const [products, setProducts] = useState([]);
  const { id } = match.params;
  const ownsStore = partners.some(partner => partner === parseInt(id));
  const isBigScreen = useMediaQuery({ minWidth: 960 });

  useEffect(() => {
    const getPartner = async () => {
      const response = await API.partners.get(id);
      console.log(response.data.id);
      setStore(response.data);
    };
    const getProducts = async () => {
      const response = await API.productList.get(id);
      setProducts(response.data);
    };

    getPartner();
    getProducts();
  }, [ id, API ]);
  return (
    <div className="Store">
      <button className="Store-close" onClick={() => history.push('/stores/')}><FiX size="30"/></button>
      <section className="Store-showcase">
        <div className="Store-image">
          <img src={`/photos/${store.image}`} alt="" style={{ width: "100%" }} />
        </div>
        <article className="Store-Details">
          <h1 className="high-emphasis h4 text-capitalize">{store.name}</h1>
          <p className="Store-Detail">{store.description}</p>
        </article>
      </section>

      {(!isBigScreen || ownsStore) && <section className="Store-actions">
        {!ownsStore ?
          <Button label={t('store-detail:callButton')} onClick={() => window.open(`tel:${store.addresses[0].phone}`)} secondary/>
          :
          <>
          {/*
            <Button span label={t('account:edit')}/>
          */}
            <Button onClick={logoutSuccess} label={t('account:logout')} secondary/>
          {/*
            <Button to={`${match.url}/product`} label={t('account:manageProduct')} secondary/>
          */}
            <Button to={`${match.url}/product`} label={t('account:addProduct')} secondary/>
          </>
        }
      </section>
      }
      <ProductList products={products} edit={ownsStore} />
      {ownsStore ? <Tab /> : ''}
    </div>
  );
}

export default Store;
