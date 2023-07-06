import React from 'react';
import { CircularProgress } from '@mui/material';

import styles from './Spinner.module.scss';

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <CircularProgress size={80} className={styles.loader} />
    </div>
  );
};

export default Spinner;
