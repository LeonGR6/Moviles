import { Box, Text, Image, Link, VStack, Heading } from '@gluestack-ui/themed';
import ProductCard from '../components/product_card';
import Index from '.';
import useCategory from '../hooks/useCategory';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

function PreWorkout() {
    const { handleClickCategory } = useCategory();

    const isFocused = useIsFocused();
    { isFocused ? handleClickCategory(3) : null }

    return (
        <ScrollView>
            <Index />
        </ScrollView>
    )
}
export default PreWorkout;