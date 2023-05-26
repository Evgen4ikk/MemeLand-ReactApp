import React, { FC, useEffect, useState } from 'react';
import classes from './customProgressBar.module.css';

const CustomProgressBar: FC= () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    const timeout = setTimeout(handleComplete, 1000);

    handleStart();

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={classes.progress_bar_container}>
      {loading && (
        <div className={classes.progress_bar}>
          <div className={classes.progress_bar_inner} />
        </div>
      )}
    </div>
  );
};

export default CustomProgressBar;
