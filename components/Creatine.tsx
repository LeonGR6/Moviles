import Index from '../views';
import useCategory from '../hooks/useCategory';
import {  useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

function Creatine () {
    const {  handleClickCategory } = useCategory();
    const isFocused = useIsFocused();
  
    useEffect(() => {
      if (isFocused) {
        handleClickCategory(2); 
      }
    }, [isFocused, handleClickCategory]);

    return (
        <Index/>
        )
}
export default Creatine;