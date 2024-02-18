import { Box, Button, ButtonText, CloseIcon, Heading, Icon, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Image, Text, VStack } from '@gluestack-ui/themed'
import React from 'react'
import useCategory from '../hooks/useCategory'
import { useState } from 'react';

export default function Product_modal() {
    const { modal, handleClickModal, product, handleAddOrder} = useCategory();
    const [quantity, setQuantity] = useState(1);

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
                        <Text fontSize='$xl' fontFamily="$body" mt={5}>
                            {product.description}
                        </Text>

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
                            handleClickModal();
                            handleAddOrder({...product, quantity});
                        }}
                    >
                        <ButtonText>Add to cart</ButtonText>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
