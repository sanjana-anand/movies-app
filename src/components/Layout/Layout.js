import React from 'react';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Content from '../Content/Content';
import classes from './Layout.module.scss';

const Layout = () => {
  return (
    <div className={classes.Layout}>
      <SideDrawer />
      <Content />
    </div>
  );
}

export default Layout;