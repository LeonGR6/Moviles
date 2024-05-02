import 'react-native-gesture-handler';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from './config/gluestack-ui.config';
import LoggedTab from './navigation/navigation';
import { useFonts } from 'expo-font';
import { SubstanceProvider } from './context/categoryProvider.js';
import { ErrorProvider } from './context/errorContext';
import { AuthProvider, useAuth } from './auth/context';
import { EventRegister } from 'react-native-event-listeners'
import React, { useState, useEffect } from 'react'
import theme from './theme/theme';
import themeContext from './theme/themeContext';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { AdminDrawer } from './navigation/adminDrawer';
import { AuthStack } from './navigation/auth';
import useCategory from './hooks/useCategory';


let fontsLoaded = {
  'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
  'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
  'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
  'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
};




export default function App() {

  const [isLoaded] = useFonts(fontsLoaded);
  
  const [isDarkMode, setIsDarkMode] = useState(false);


  useEffect(() => {
    const listener = EventRegister.addEventListener('ChangeTheme', (data) => {
      setIsDarkMode(data)
    })
    return () => {
      EventRegister.removeAllListeners()
    }
  }, [isDarkMode])

  const Container = () => {
    const { isAuthenticated, user } = useAuth();
  
    return (
      <NavigationContainer theme={isDarkMode === true ? DarkTheme : DefaultTheme}>
        {isAuthenticated ? (
          user?.admin === 1 ? <AdminDrawer /> : <LoggedTab />
  
        ) : (
          <AuthStack />
        )}
      </NavigationContainer>
    )
  };

  if (isLoaded) {
    return (
      <AuthProvider>
        <themeContext.Provider value={isDarkMode === true ? theme.dark : theme.light}>
          <SubstanceProvider>
            <ErrorProvider>
              <GluestackUIProvider config={config} >
                <Container />
              </GluestackUIProvider>
            </ErrorProvider>
          </SubstanceProvider>
        </themeContext.Provider>
      </AuthProvider>


    );
  }
 

}



