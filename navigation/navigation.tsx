import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Image } from '@gluestack-ui/themed';

import { NavigationContainer } from '@react-navigation/native';

import Creatine from '../views/Creatine';
import Protein from '../views/Protein';
import PreWorkout from '../views/PreWorkout';

import LoggedUser from '../views/LoggedUser';
import { useAuth } from '../auth/context';
import { AuthStack } from './auth';
import { useContext } from 'react';
import useCategory from '../hooks/useCategory';

const Tab = createBottomTabNavigator();

function LoggedTab() {
    const {clearCategory} = useCategory();


    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#ca8a04'
            }}
        >
            <Tab.Screen
                name='Protein'
                options={{
                    headerShown: false,
                    tabBarLabel: 'Protein',
                    tabBarIcon: ({ focused, size }) => (
                        <Image
                            source={require('../assets/Icons/Protein.png')}
                            style={{ tintColor: focused ? '#ca8a04' : 'gray', width: size, height: size }}
                            resizeMode="contain"
                            alt='desc'

                        />
                    )
                }}
                component={Protein}
                listeners={{ tabPress: clearCategory }}


            />
            <Tab.Screen
                name='Creatine'
                options={{
                    headerShown: false,
                    tabBarLabel: 'Creatine',
                    tabBarIcon: ({ focused, size }) => (
                        <Image
                            source={require('../assets/Icons/Creatine.png')} // Ajusta la ruta al ícono local
                            style={{ tintColor: focused ? '#ca8a04' : 'gray', width: size, height: size }}
                            resizeMode="contain"
                            alt='desc'
                        />
                    )

                }}
                component={Creatine}
                listeners={{ tabPress: clearCategory }}

            />
            <Tab.Screen
                name='PreWorkout'
                options={{
                    headerShown: false,
                    tabBarLabel: 'PreWorkout',
                    tabBarIcon: ({ focused, size }) => (
                        <Image
                            source={require('../assets/Icons/PreWorkout.png')} // Ajusta la ruta al ícono local
                            style={{ tintColor: focused ? '#ca8a04' : 'gray', width: size, height: size }}
                            resizeMode="contain"
                            alt='desc'
                        />
                    )
                }}
                component={PreWorkout}
                listeners={{ tabPress: clearCategory }}
            />
            <Tab.Screen
                name='User'
                options={{
                    headerShown: false,
                    tabBarLabel: 'User',
                    tabBarIcon: ({ focused, size }) => (
                        <Image
                            source={require('../assets/Icons/User.png')} // Ajusta la ruta al ícono local
                            style={{ tintColor: focused ? '#ca8a04' : 'gray', width: size, height: size }}
                            resizeMode="contain"
                            alt='desc'
                        />
                    )
                }}
                component={LoggedUser}
            />

        </Tab.Navigator>
    )
}

export const Navigation = () => {
    const { isAuthenticated, user } = useAuth();
    return (
        <NavigationContainer>
            {isAuthenticated ? <LoggedTab /> : <AuthStack />}
        </NavigationContainer>
    )
}