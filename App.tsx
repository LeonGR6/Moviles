import { GluestackUIProvider, ImageBackground } from '@gluestack-ui/themed';
import { config } from './config/gluestack-ui.config';
import { Navigation } from './navigation/navigation';
import { useFonts } from 'expo-font';
import { SubstanceProvider } from './context/categoryProvider.js';
import { ErrorProvider } from './context/errorContext';
import { AuthProvider } from './auth/context';
import { View, StyleSheet } from 'react-native';
import Cart from './components/cart';




export default function App() {
  const [fontsLoaded] = useFonts({
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
  });
  return (
    <ErrorProvider>
      <AuthProvider>
        <GluestackUIProvider config={config} >
          <SubstanceProvider>
            <Home />
          </SubstanceProvider>
        </GluestackUIProvider>
      </AuthProvider>
    </ErrorProvider>
  );
}

const Home = () => {
  return (
  <Container/>
  );
};


const Container = () => {
  return (
    <Navigation />
  );
};
