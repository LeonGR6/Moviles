import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../views/login';
import Register from '../views/register';

type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Login'
                component={Login}
                options={{
                    headerShown: false
                }} />
            <Stack.Screen
                name='Register'
                component={Register}
                options={{
                    headerShown: false
                }} />
        </Stack.Navigator>


    )
}