import useSWR from 'swr'
import React, { useContext, useState } from 'react'
import { View, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import ProductCard from '../components/product_card';
import clientAxios from '../config/axios';
import useCategory from '../hooks/useCategory';
import Product_modal from '../components/product_modal';
import { LinearGradient } from 'expo-linear-gradient';
import Cart from '../components/cart';
import AlertCart from '../components/AlertCart';
import ModalCart from '../components/ModalCart';
import { HStack, Switch, Text } from '@gluestack-ui/themed';
import { EventRegister } from 'react-native-event-listeners'
import themeContext from '../theme/themeContext';



export default function Index() {
  const { actualCategory, modal, showModalCart } = useCategory();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = useContext(themeContext);



  const fetcher = () => clientAxios('/api/products').then(response => response.data);
  const { data, isLoading } = useSWR('/api/products', fetcher);
  const products = isLoading || !actualCategory ? [] : data.data.filter((product: { categories_id: any; }) => product.categories_id === actualCategory.id);

  return (
    <>
      <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <SafeAreaView>

          <ScrollView>
            <HStack space="sm" mt={10} justifyContent='flex-end'>
              <Switch defaultValue={isDarkMode} onValueChange={(value) => {
                setIsDarkMode(value)
                EventRegister.emit('ChangeTheme', value)
              }}
              />
              <Text style={{ color: theme.color }} size="sm" >Dark mode</Text>
            </HStack>
            <View style={styles.rowContainer}>
              {products.map((product: { id: React.Key | null | undefined; }) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </View>
          </ScrollView>
          <Cart />
          {modal && (
            <Product_modal />
          )}
          {showModalCart && (
            <ModalCart />
          )}
        </SafeAreaView >



        <AlertCart />
      </View>
    </>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white'


  },
  rowContainer: {
    flexDirection: 'column',
    marginTop: 20,
  },
  modal: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
});

