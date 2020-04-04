import React, { useState } from 'react';

import { businessImages } from '../../shared/businessImages'
import './StoreList.scss';
import { Link } from 'react-router-dom';


const StoreList = ({ type, editorView }) => {
  const stores = [
    { name: 'Manfreds Bakery', desc: 'A mix of some flourish stuff and water, plus some salty crystals looking like salt...' },
    { name: 'BlueMen', desc: 'A mix of some flourish stuff and water, plus some salty crystals looking like salt...' },
    { name: 'DanyOils', desc: 'A mix of some flourish stuff and water, plus some salty crystals looking like salt...' },
  ]

  return (
    <section className="StoreList">
      <h1 className="StoreList-heading h3 high-emphasis">Stores nearby</h1>

      <div className="StoreList-stores">
        {stores.map((e, i) => (
          <Link to={`/stores/${i + 1}`} className="StoreList-store">
            <div className="StoreList-store-img">
              <img src={businessImages[i]} alt="" />
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
}

export default StoreList;
