import React from 'react';
import { RouteProps, Outlet } from 'react-router-dom';

import styles from './MainLayout.module.scss';

const MainLayout = (props: RouteProps) => {
  const { children } = props;

  return (
    <main className={styles.main}>
      <div className={styles.childrenWrapper}>{children}</div>
      <Outlet />
    </main>
  );
};

export default MainLayout;
