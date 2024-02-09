import { Text, Image, Button, Box, ButtonText, VStack, Heading } from '@gluestack-ui/themed';
import React from 'react';

function ProductCard({ products }) {
  const { name, image, price } = products

  return (
    <Box
      width={130}
      m="$5"
    >
      <Box
        bg='$light300'
        maxWidth={400}
        h={150}
      >
        <Image
          mb="$1"
          h="$full"
          width="$full"
          borderRadius="$md"
          source={image}
          alt="description of image"
        />
      </Box>

      <VStack mb="$1">
        <Heading size="md" fontFamily="$heading" mb="$1">
          {name}
        </Heading>
        <Text size='lg' fontFamily="$body">
          ${price}
        </Text>
        <Button
          mt='$3'
          bg="$yellow500"
          $active-bg="$yellow600"
          size="sm"
          variant="solid"
          >
          <ButtonText size="sm">Add to cart</ButtonText>
        </Button>
      </VStack >


    </Box>
  )
}
export default ProductCard;