import React from 'react';

import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/all" exact>Movies</NavigationItem>
        <NavigationItem link="/favorites" exact>Favorites</NavigationItem>
    </ul>
);

export default NavigationItems;