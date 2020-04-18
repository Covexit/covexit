import React, { useEffect, useState } from 'react';
import './CategorySelect.scss';
import API from '../../shared/api';
import Button from '../Button/Button';


function CategorySelect({ onSelected }) {
  const [categories, setCategories] = useState([]);
  const [breadcrumbs, setBreadcrumb] = useState([]);

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
  }, [onSelected, breadcrumbs]);

  return (<div className="CategorySelect">
    <div className="CategorySelect__breadcrumbs">
      <button className="CategorySelect__breadcrumb" onClick={() => setBreadcrumb([])}>Reset</button>
      {breadcrumbs.map(item => (
        <button key={item.slug} className="CategorySelect__breadcrumb" onClick={() => updateCategories(item, true)}>{item.name}</button>
      ))}
    </div>
    {categories.map(item => (
      <div className="CategorySelect__choice" key={item.slug}><Button onClick={() => updateCategories(item)}>{item.name}</Button></div>
    ))}
  </div>)
}

export default CategorySelect;
