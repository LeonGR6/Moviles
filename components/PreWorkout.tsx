import Index from '../views';
import useCategory from '../hooks/useCategory';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import React from 'react';

function PreWorkout() {
    const { handleClickCategory } = useCategory();
    const isFocused = useIsFocused();
  
    useEffect(() => {
      if (isFocused) {
        handleClickCategory(3); 
      }
    }, [isFocused, handleClickCategory]);
    return (
            <Index />
    )
}
export default PreWorkout;