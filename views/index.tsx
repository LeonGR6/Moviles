import useSWR from 'swr'
import React from 'react'
import { View, StyleSheet } from 'react-native';
import ProductCard from '../components/product_card';
import clientAxios from '../config/axios';
import useCategory from '../hooks/useCategory';

export default function Index() {
  const { actualCategory } = useCategory();

  const fetcher = () => clientAxios('/api/products').then(response => response.data);
  const { data, error, isLoading } = useSWR('/api/products', fetcher);
  const products = isLoading ? [] : data.data.filter((products: { categories_id: any; }) => products.categories_id === actualCategory.id);


  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        {products.map((product: { id: React.Key | null | undefined; }) => (
          <ProductCard key={product.id} products={product} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

