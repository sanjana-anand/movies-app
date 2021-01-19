import React from 'react';
import Movies from '../Movies/Movies';
import classes from './Content.module.scss';

const Content = () => {
  return (
    <div className={classes.Content}>
      <Movies />
    </div>
  );
}

export default Content;