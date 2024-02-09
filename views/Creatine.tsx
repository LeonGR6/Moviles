import { Box, Text, Image, Link, VStack, Heading } from '@gluestack-ui/themed';
import ProductCard from '../components/product_card';
import Index from '.';
import useCategory from '../hooks/useCategory';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

function Creatine () {
    const {handleClickCategory} = useCategory();

    const isFocused = useIsFocused();
    {isFocused ? handleClickCategory(2) : null}

    return (
        <ScrollView>
        <Index/>
        </ScrollView>    
        )
}
export default Creatine;