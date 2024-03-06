import { Box, Button, ButtonText, CloseIcon, Heading, Icon, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Image, Text, VStack, ScrollView } from '@gluestack-ui/themed'
import React, { useEffect } from 'react'
import useCategory from '../hooks/useCategory'
import { useState } from 'react';
import ExpandableText from './ExpandableText';

export default function Product_modal({ }) {
    const { handleClickModal, product, handleAddOrder, order, modal } = useCategory();
    const [quantity, setQuantity] = useState(1);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if (order.some((orderState: { id: any; }) => orderState.id === product.id)) {
            const productEdit = order.filter((orderState: { id: any; }) => orderState.id === product.id)[0]

            setQuantity(productEdit.quantity)
            setEdit(true)
        }
    }, [order])

    return (

        <Modal
            isOpen={modal}
            onClose={() => {
                handleClickModal();
            }}
        >
            <ModalBackdrop />
            <ModalContent bgColor='rgb(255, 255, 230)'>
                <ModalHeader>
                    <Heading size="lg">{product.name}</Heading>
                    <ModalCloseButton>
                        <Icon as={CloseIcon} />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <Box
                        bg='$light300'
                        maxWidth='100%'
                        h={300}
                    >
                        <Image
                            mb="$1"
                            h="$full"
                            width="$full"
                            rounded="$md"
                            source={product.image}
                            alt="description of image"
                        />
                    </Box>
                    <VStack>
                        <ScrollView>
                            <ExpandableText
                                text={product.description}
                                collapsedLines={1} />

                            {/* <Text fontSize='$xl' fontFamily="$body" mt={5}>
                            {product.description}
                        </Text> */}

                            <Box flex={1} flexDirection='row' justifyContent='space-between'>
                                <Text fontWeight='$bold' fontSize='$2xl' mt={5} flexDirection='column'>
                                    ${product.price}
                                </Text>
                                <Button
                                    bgColor='transparent'
                                    onPress={() => {
                                        if (quantity <= 1) return
                                        setQuantity(quantity - 1);
                                    }}>
                                    <Image
                                        source={require('../assets/Icons/remove.png')}
                                        style={{ width: '24px', height: '24px' }}
                                        resizeMode="contain"
                                        alt='desc'

                                    />
                                </Button>
                                <Text fontWeight='$bold' fontSize='$lg' mt={5} flexDirection='column'>
                                    {quantity}
                                </Text>
                                <Button
                                    bgColor='transparent'
                                    onPress={() => {
                                        if (quantity >= 5) return
                                        setQuantity(quantity + 1);
                                    }}>
                                    <Image
                                        source={require('../assets/Icons/add.png')}
                                        style={{ width: '24px', height: '24px' }}
                                        resizeMode="contain"
                                        alt='desc'

                                    />
                                </Button>


                            </Box>
                        </ScrollView>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button
                        size="sm"
                        action="secondary"
                        mr="$3"
                        onPress={() => {
                            handleClickModal();
                        }}
                    >
                        <ButtonText>Cancel</ButtonText>
                    </Button>
                    <Button
                        size="sm"
                        action="positive"
                        borderWidth="$0"
                        bg="$yellow500"
                        $active-bg="$yellow600"
                        onPress={() => {
                            handleAddOrder({ ...product, quantity });
                            setQuantity(1);
                            handleClickModal();

                        }}
                    >
                        <ButtonText>{edit ? "Save changes" : "Add to cart"}</ButtonText>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
