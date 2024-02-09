import {  GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from './config/gluestack-ui.config';
import Navigation from './navigation';
import { useFonts } from 'expo-font';
import { SubstanceProvider } from './context/categoryProvider.js';
import Login from './views/login';
import Register from './views/register';


  export default function App() {
    const [fontsLoaded] = useFonts({
      'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
      'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
      'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    });
  return (
    <GluestackUIProvider config={config} >
      <SubstanceProvider>
      <Home />
      </SubstanceProvider>
    </GluestackUIProvider>
  );
}

const Home = () => {
  return <Container />;
};



const Container = () => {
  return (
    <Navigation/>
    );
};
