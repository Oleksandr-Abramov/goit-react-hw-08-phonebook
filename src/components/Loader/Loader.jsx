import React from 'react';
import { BallTriangle } from 'react-loader-spinner';
import s from './Loader.module.css';

export const Loader = () => (
  <div className={s.loader}>
    <BallTriangle
      height={100}
      width={100}
      radius={5}
      color="#4fa94d"
      ariaLabel="ball-triangle-loading"
      wrapperClass={{}}
      wrapperStyle=""
      visible={true}
    />
  </div>
);
