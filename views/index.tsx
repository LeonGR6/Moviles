import useSWR from 'swr'
import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native';
import ProductCard from '../components/product_card';
import clientAxios from '../config/axios';
import useCategory from '../hooks/useCategory';
import Product_modal from '../components/product_modal';
import { LinearGradient } from 'expo-linear-gradient';
import Cart from '../components/cart';
import { useAuth } from '../auth/context';


export default function Index() {
  const { actualCategory, modal } = useCategory();


  const fetcher = () => clientAxios('/api/products').then(response => response.data);


  const { data, isLoading } = useSWR('/api/products', fetcher);

  const products = isLoading || !actualCategory ? [] : data.data.filter((product: { categories_id: any; }) => product.categories_id === actualCategory.id);

  return (
    <>
      <LinearGradient
        colors={['rgba(255, 255, 255,1)', 'rgba(255, 255, 255, 1)']}
        style={styles.container}
      >
        <ScrollView>
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
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: 20,



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

