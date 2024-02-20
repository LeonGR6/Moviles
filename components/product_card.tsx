import { Text, Image, Button, Box, ButtonText, VStack, Heading } from '@gluestack-ui/themed';
import React from 'react';
import useCategory from '../hooks/useCategory';


function ProductCard({ product }: { product: any }) {
  const { name, image, price } = product
  const {handleClickModal, handleSetProduct} = useCategory();
  
  return (
    <Box
      m="$1"
      mb={20}
      rounded="$lg"
      hardShadow="5"
      bgColor='rgba(255, 255, 153, 0.40)'
      p={15}
      display="flex" flexDirection="row" alignItems="center"
    >
      <Box
        maxWidth={'40%'}
        h={150}
        flex={1}
      >
        <Image
          mb="$1"
          h="$full"
          width="$full"
          rounded="$md"
          source={image}
          alt="description of image"
        />
      </Box>

      <VStack mb="$1" marginLeft={30}>
        <Heading size="md" fontFamily="$heading" mb="$1">
          {name}
        </Heading>
        <Text size='lg'  fontFamily="$body" >
          ${price}
        </Text>
        <Button
          mt='$3'
          bg="$yellow500"
          $active-bg="$yellow600"
          size="sm"
          variant="solid"
          onPress={()=>{handleClickModal(); handleSetProduct(product);}}
          >
          <ButtonText size="sm">Add to cart</ButtonText>
        </Button>
        
      </VStack >

    </Box>
  )
}
export default ProductCard;