import Index from '../views';
import { useIsFocused } from '@react-navigation/native';
import useCategory from '../hooks/useCategory';
import React, { useEffect } from 'react';

function Protein (){
    const { handleClickCategory } = useCategory();
    const isFocused = useIsFocused();
  
    useEffect(() => {
      if (isFocused) {
        handleClickCategory(1); 
      }
    }, [isFocused, handleClickCategory]);

    return (
        <Index/>
    )
}
export default Protein;