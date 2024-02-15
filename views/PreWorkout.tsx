import Index from '.';
import useCategory from '../hooks/useCategory';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useEffect } from 'react';

function PreWorkout() {
    const { actualCategory, handleClickCategory } = useCategory();
    const isFocused = useIsFocused();
  
    useEffect(() => {
      if (isFocused) {
        handleClickCategory(3); 
      }
    }, [isFocused, handleClickCategory]);

    console.log(actualCategory);

    return (
        <ScrollView>
            <Index />
        </ScrollView>
    )
}
export default PreWorkout;