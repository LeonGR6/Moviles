import 'react-native-gesture-handler';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from './config/gluestack-ui.config';
import { Navigation } from './navigation/navigation';
import { useFonts } from 'expo-font';
import { SubstanceProvider } from './context/categoryProvider.js';
import { ErrorProvider } from './context/errorContext';
import { AuthProvider } from './auth/context';
import React from 'react';





export default function App() {
  
  const [fontsLoaded] = useFonts({
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
  });

  return (
    <AuthProvider>
      <SubstanceProvider>
        <ErrorProvider>
          <GluestackUIProvider config={config} >
            <Home />
          </GluestackUIProvider>
        </ErrorProvider>
      </SubstanceProvider>
    </AuthProvider>


  );
}

const Home = () => {
  return (
    <Container />
  );
};


const Container = () => {
  return (
    <Navigation />
  );
};
