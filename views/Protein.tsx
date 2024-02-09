import { Box, Text, Image, Link, VStack, Heading } from '@gluestack-ui/themed';
import ProductCard from '../components/product_card';
import Index from '.';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import useCategory from '../hooks/useCategory';
import React from 'react';

function Protein (){
    const {handleClickCategory} = useCategory();

    const isFocused = useIsFocused();
    {isFocused ? handleClickCategory(1) : null}

    return (
        <ScrollView>
        <Index/>
        </ScrollView>
    )
}
export default Protein;