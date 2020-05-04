import React, { useState, useEffect } from 'react';


import { useTranslation } from 'react-i18next';
import { useUserContext } from '../context/UserContext';

import Button from '../components/Button/Button';
import ProductList from '../components/ProductList/ProductList';
import Tab from '../components/Tab/Tab';
import API, { axiosInstance } from '../shared/api';
import './Store.scss';
import { useMediaQuery } from 'react-responsive';
import Cart from '../components/Cart/Cart';

const Store = ({ match }) => {
  const [t] = useTranslation(['store-detail', 'account']);
  const { partners, logoutSuccess } = useUserContext();
  const [store, setStore] = useState({});
  const [products, setProducts] = useState([]);
  const { id } = match.params;
  const ownsStore = partners.some(partner => partner === parseInt(id));
  const isBigScreen = useMediaQuery({ minWidth: 960 });

  useEffect(() => {
    const getPartner = async () => {
      const response = await API.partners.get(id);
      setStore(response.data);
    };
    const getProducts = async () => {
      const response = await API.productList.get(id);
      const products = await Promise.all(
        response.data.map(async (product) => {
          const records = (await axiosInstance.get(product.stockrecords)).data;
          return {...product,
            available: records[0].url,
            stockrecord_url: records[0].url
          }
        })
      );
      setProducts(products);
    };

    getPartner();
    getProducts();
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

      {(!isBigScreen || ownsStore) && <section className="Store-actions">
        {!ownsStore ?
          <Button label={t('store-detail:callButton')} onClick={() => window.open(`tel:${store.addresses[0].phone}`)} secondary/>
          :
          <>
            <Button span label={t('account:edit')}/>
            <Button onClick={logoutSuccess} label={t('account:logout')} secondary/>
            <Button to={`${match.url}/product`} label={t('account:manageProduct')} secondary/>
            <Button to={`${match.url}/product`} label={t('account:addProduct')} secondary/>
          </>
        }
      </section>
      }

      {ownsStore ? <Tab /> : ''}

      <ProductList products={products} type="add" />
      <Cart />
    </div>
  );
}

export default Store;
