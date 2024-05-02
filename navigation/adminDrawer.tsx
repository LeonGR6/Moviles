import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Products from '../views/admin/products';
import Orders from '../views/admin/orders';
import React from 'react';
import LoggedUser from '../views/LoggedUser';
import Ionicons from '@expo/vector-icons/Ionicons';
import userInformation from '../views/userInformation';
import EditUserStack from './editUserStack';



const Drawer = createDrawerNavigator();

export const AdminDrawer = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: {
                    backgroundColor: '#fefce8',
                    width: 240,
                },
                drawerActiveTintColor: '#eab308',
                drawerInactiveTintColor: 'black',


            }}

        >
            <Drawer.Screen name="Admin" component={EditUserStack} options={{
                headerStyle: {
                    backgroundColor: '#eab308',
                },
                drawerIcon: ({ color, size }) => (
                    <Ionicons name="person" size={size} color={color} />
                ),



            }} />
            <Drawer.Screen name="Products" component={Products} options={{
                headerStyle: {
                    backgroundColor: '#eab308',
                },
            }} />
            <Drawer.Screen name="Orders" component={Orders} options={{
                headerStyle: {
                    backgroundColor: '#eab308',
                },

            }} />

        </Drawer.Navigator>

    );
}


