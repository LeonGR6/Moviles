import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Image } from '@gluestack-ui/themed';

import { NavigationContainer } from '@react-navigation/native';

import useCategory from './hooks/useCategory';
import Creatine from './views/Creatine';
import Protein from './views/Protein';
import PreWorkout from './views/PreWorkout';
import UserStack from './views/UserStack';

const Tab = createBottomTabNavigator();


function MyTab() {

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
                              source={require('./assets/Icons/Protein.png')}
                              style={{tintColor: focused ?  '#ca8a04' : 'gray', width: size, height: size }}
                              resizeMode="contain"
                              alt='desc'

                            />
                        )
                    }}
                    component={Protein}

                />
                 <Tab.Screen
                    name='Creatine'
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Creatine',
                        tabBarIcon: ({ focused, size }) => (
                            <Image
                              source={require('./assets/Icons/Creatine.png')} // Ajusta la ruta al ícono local
                              style={{tintColor: focused ?  '#ca8a04' : 'gray', width: size, height: size }}
                              resizeMode="contain"
                              alt='desc'
                            />
                        )
                        
                    }}
                    component={Creatine}
                />
                  <Tab.Screen
                    name='PreWorkout'
                    options={{
                        headerShown: false,
                        tabBarLabel: 'PreWorkout',
                        tabBarIcon: ({ focused, size }) => (
                            <Image
                              source={require('./assets/Icons/PreWorkout.png')} // Ajusta la ruta al ícono local
                              style={{tintColor: focused ?  '#ca8a04' : 'gray', width: size, height: size }}
                              resizeMode="contain"
                              alt='desc'
                            />
                        )
                    }}
                    component={PreWorkout}
                />
                <Tab.Screen
                    name='User'
                    options={{
                        headerShown: false,
                        tabBarLabel: 'User',
                        tabBarIcon: ({ focused, size }) => (
                            <Image
                              source={require('./assets/Icons/User.png')} // Ajusta la ruta al ícono local
                              style={{tintColor: focused ?  '#ca8a04' : 'gray', width: size, height: size }}
                              resizeMode="contain"
                              alt='desc'
                            />
                        )
                    }}
                    component={UserStack}
                />

        </Tab.Navigator>
    )
}


export default function Navigation() {
    return (
        <NavigationContainer>
            <MyTab />
        </NavigationContainer>
    )
}