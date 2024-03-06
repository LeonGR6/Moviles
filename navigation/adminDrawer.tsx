import { createDrawerNavigator } from '@react-navigation/drawer';
import { Button } from '@gluestack-ui/themed';
import Products from '../views/admin/products';
import Orders from '../views/admin/orders';
import React from 'react';
import LoggedUser from '../views/LoggedUser';


const Drawer = createDrawerNavigator();

export const AdminDrawer = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Admin" component={LoggedUser} />
            <Drawer.Screen name="Products" component={Products} />
            <Drawer.Screen name="Orders" component={Orders} />
        </Drawer.Navigator>
    );
}
