import { View, Text, Image, Box, Button } from "@gluestack-ui/themed";
import useCategory from "../hooks/useCategory";
import React from "react";

export default function Order({ product }: { product: any }) {

    const { handleDeleteProductCart, handleEditQuantity } = useCategory();
    
    const { id, name, price, quantity } = product;

    return (
        <View display="flex" flexDirection="row" alignItems="center" marginBottom={16} rounded={15} hardShadow="5" bgColor="$yellow200">
            <Box
                w={140}
                h={140}
                flex={1}

            >
                <Image
                    mb="$1"
                    h="$full"
                    width="$full"
                    rounded="$md"
                    source={product.images[0].image_path}
                    alt="description of image"
                />
            </Box>
            <Box
                flex={2}
                display="flex"
                flexDirection="column"
            >
                <Box flex={1} flexDirection="row" ml={5} mt={10}>
                    <Text fontSize="$xl" fontFamily="$heading">{name}</Text>
                    <Text fontSize="$xl" fontFamily="$heading" ml={30}>${price}</Text>
                </Box>
                <Box flex={1} flexDirection="row" mt={10}>
                    <Text fontWeight="$bold" fontSize="$lg"> Qty: </Text>
                    <Text fontWeight="$bold" fontSize="$xl"> {quantity} </Text>
                </Box>
                <Box flex={1} flexDirection="row" mt={10} >
                    <Text fontWeight="$bold" fontSize="$lg" ml={40}> Subtotal: </Text>
                    <Text fontWeight="$bold" fontSize="$xl">${price * quantity} </Text>
                </Box>
                <Box flex={1} flexDirection="row" mt={10}>

                    <Button
                        bgColor="transparent"
                        onPress={()=>handleDeleteProductCart(id)}
                    >
                        <Image
                            source={require('../assets/Icons/delete.png')}
                            style={{ width: '24px', height: '24px' }}
                            resizeMode="contain"
                            alt='desc'

                        />
                    </Button>
                    <Button
                        bgColor="transparent"
                        ml={40}
                        onPress={()=>handleEditQuantity(id)}
                    >
                        <Image
                            source={require('../assets/Icons/edit.png')}
                            style={{ width: '24px', height: '24px' }}
                            resizeMode="contain"
                            alt='desc'

                        />
                    </Button>
                </Box>
            </Box>


        </View >
    )
}
