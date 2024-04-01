import { Text, Image, Button, Box, ButtonText, VStack, Heading } from '@gluestack-ui/themed';
import React, { useState } from 'react';
import useCategory from '../../../hooks/useCategory';

function ProductCardAdmin({ product }: { product: any }) {
    const { id, name } = product
    const { handleSetProduct, handleClickAdmin, getProduct, setShowAlertDelete } = useCategory();


    return (
        <>
            <Box
                m="$1"
                mb={20}
                rounded="$lg"
                hardShadow="5"
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
                        w="$full"
                        rounded="$md"
                        source={{ uri: product.images[0].image_path }}
                        alt="description of image"
                    />
                </Box>

                <VStack mb="$1" marginLeft={30}>
                    <Heading size="md" fontFamily="$heading" mb="$1">
                        {name}
                    </Heading>
                    <Button
                        mt='$3'
                        bg="$yellow500"
                        $active-bg="$yellow600"
                        size="sm"
                        variant="solid"
                        onPress={() => { handleClickAdmin(); handleSetProduct(product); getProduct(id) }}
                    >
                        <ButtonText size="sm">Edit</ButtonText>
                    </Button>
                    <Button
                        mt='$3'
                        action="negative"
                        size="sm"
                        variant="solid"
                        onPress={() => { setShowAlertDelete(true); handleSetProduct(product); }}

                    >
                        <ButtonText size="sm">Delete</ButtonText>
                    </Button>


                </VStack >


            </Box>

        </>

    )
}
export default ProductCardAdmin;