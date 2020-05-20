import React, { useEffect, useState } from 'react';
import './CategorySelect.scss';
import Button from '../Button/Button';
import useApi from '../../shared/api';
import Fields from '../Fields/Fields';
import { useTranslation } from 'react-i18next';


function CategorySelect({ onSelected }) {
  const [categories, setCategories] = useState([]);
  const [breadcrumbs, setBreadcrumb] = useState([]);
  const [t] = useTranslation('product-cru');
  const { API } = useApi();


  const updateCategories = (item, reset) => {
    const _breadcrumbs = [...breadcrumbs.slice(
      0, reset ? breadcrumbs.indexOf(item) : breadcrumbs.length), item];
    setBreadcrumb(_breadcrumbs);
  };

  useEffect(() => {
    async function fetchCategories(url) {
      const response = await API.categories.get({ url });
      setCategories(response.data);

      if (!response.data.length) {
        onSelected({ ...breadcrumbs[breadcrumbs.length - 1], class: breadcrumbs[0].slug });
      } else {
        onSelected(false);
      }
    }

    const item = breadcrumbs[breadcrumbs.length - 1];
    fetchCategories((item && item.children) || '')
  }, [onSelected, breadcrumbs, API]);

  return (<div className="CategorySelect">
    <Fields.Label>{t('product-cru:category')}</Fields.Label>
    {
      !!breadcrumbs.length &&
      <div className="CategorySelect__breadcrumbs">
        <button className="CategorySelect__breadcrumb" onClick={() => setBreadcrumb([])}>Reset</button>
        {breadcrumbs.map(item => (
          <button key={item.slug} className="CategorySelect__breadcrumb" onClick={() => updateCategories(item, true)}>{item.name}</button>
        ))}
      </div>
    }
    {categories.map(item => (
      <div className="CategorySelect__choice" key={item.slug}><Button secondary onClick={() => updateCategories(item)}>{item.name}</Button></div>
    ))}
  </div>)
}

export default CategorySelect;
