import Index from '.';
import useCategory from '../hooks/useCategory';
import {  useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

function Creatine () {
    const { actualCategory, handleClickCategory } = useCategory();
    const isFocused = useIsFocused();
  
    useEffect(() => {
      if (isFocused) {
        handleClickCategory(2); 
      }
    }, [isFocused, handleClickCategory]);

    console.log(actualCategory);

    return (
        <ScrollView>
        <Index/>
        </ScrollView>    
        )
}
export default Creatine;