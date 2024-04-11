import React from 'react'
import { AddIcon, Button, ButtonIcon, ButtonText, Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger, Text, View } from '@gluestack-ui/themed'
import { StyleSheet, ScrollView } from 'react-native';

import clientAxios from '../../config/axios'
import useSWR from 'swr'
import ProductCardAdmin from './components/ProductCardAdmin';
import useCategory from '../../hooks/useCategory';
import Product_modalAdmin from './components/ProductModalAdmin';
import AlertDelete from './components/AlertDelete';
import AlertEdit from './components/AlertEdit';
import Product_modalAdminEmpty from './components/ProductModalAdminEmpty';



export default function Products() {
  const { categories, actualCategory, handleClickCategory, clearCategory, modalAdmin,modalAdminEmpty, handleClickAdminEmpty, handleSetProduct } = useCategory();

  const fetcher = () => clientAxios('/api/products').then(datos => datos.data);


  const { data, error, isLoading } = useSWR('/api/products', fetcher, { refreshInterval: 1000 });


  const handleCategoryChange = (value: string) => {
    const selectedCategoryId = categories?.find((category: { name: string }) => category.name === value)?.id;
    if (selectedCategoryId !== undefined) {
      handleClickCategory(selectedCategoryId);
    } else {
      clearCategory();
    }
  };



  const products = isLoading ? [] :
    actualCategory ? data?.data.filter((product: { categories_id: any; }) => product.categories_id === actualCategory.id) : data.data;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.selectContainer}>
          <Text>Select a category:</Text>
          <Select defaultValue={'All products'} onValueChange={(value) => handleCategoryChange(value)} >
            <SelectTrigger>
              <SelectInput />
              <SelectIcon>
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem value='null' label='All products' />
                {categories.map((category: { id: string; name: string }) => (
                  <SelectItem key={category.id} value={category.name} label={category.name} />

                ))}
              </SelectContent>
            </SelectPortal>
          </Select>

        </View>
        <View mb={10}>
          <Button size="sm" variant="solid" action="positive" isDisabled={false} isFocusVisible={false} onPress={() => { handleClickAdminEmpty(); handleSetProduct(null); }} >
            <ButtonText>Add </ButtonText>
            <ButtonIcon as={AddIcon} />
          </Button>
        </View>
        <ScrollView>

          <View style={styles.rowContainer}>
            {products?.map((product: { id: React.Key | null | undefined; }) => (
              <ProductCardAdmin key={product.id} product={product} />
            ))}

          </View>
        </ScrollView >

        {modalAdmin && (
          <Product_modalAdmin />
        )}
          {modalAdminEmpty && (
          <Product_modalAdminEmpty />
        )}
      </View>
      


      <AlertDelete />
      <AlertEdit />
    </>

  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: 20,




  },
  rowContainer: {
    flexDirection: 'column',

  },
  selectContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  modalAdmin: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
});
