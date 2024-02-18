import useSWR from 'swr'
import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native';
import ProductCard from '../components/product_card';
import clientAxios from '../config/axios';
import useCategory from '../hooks/useCategory';
import Product_modal from '../components/product_modal';
import { LinearGradient } from 'expo-linear-gradient';
import Cart from '../components/cart';



export default function Index() {
  const { actualCategory, modal } = useCategory();

  const fetcher = () => clientAxios('/api/products').then(response => response.data);
  const { data, error, isLoading } = useSWR('/api/products', fetcher);
  const products = isLoading ? [] : data.data.filter((products: { categories_id: any; }) => products.categories_id === actualCategory.id);


  return (
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
      <Cart/>
      <Product_modal />
    </LinearGradient>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: 20,


  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: '20px'
  },
});

