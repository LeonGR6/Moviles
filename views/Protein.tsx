import Index from '.';
import { ScrollView } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import useCategory from '../hooks/useCategory';
import React, { useEffect } from 'react';

function Protein (){
    const { actualCategory, handleClickCategory } = useCategory();
    const isFocused = useIsFocused();
  
    useEffect(() => {
      if (isFocused) {
        handleClickCategory(1); 
      }
    }, [isFocused, handleClickCategory]);

    console.log(actualCategory);

    return (
        <ScrollView>
        <Index/>
        </ScrollView>
    )
}
export default Protein;