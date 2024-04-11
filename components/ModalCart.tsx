import { Text, ButtonText, Modal, ModalBackdrop, ModalContent, ModalHeader, Heading, ModalCloseButton, Icon, CloseIcon, ModalBody, ModalFooter, Button, View } from '@gluestack-ui/themed'
import React from 'react'
import { ScrollView } from 'react-native';
import useCategory from '../hooks/useCategory';
import Order from './cart_order';

export default function ModalCart() {
    const ref = React.useRef(null)
    const { order, total, setShowAlertCart,handleClickModalCart,showModalCart} = useCategory();
    const disableCheckoutBtn = () => order.length === 0;

    return (   
            <Modal
                isOpen={showModalCart}
                onClose={() => {
                    handleClickModalCart()
                }}
                finalFocusRef={ref}
            >
                <ModalBackdrop />
                <ModalContent bgColor='rgb(255, 255, 230)' w='95%' maxHeight={700}>
                    <ModalHeader>
                        <Heading size="lg">Carrito</Heading>
                        <ModalCloseButton>
                            <Icon as={CloseIcon} />
                        </ModalCloseButton>
                    </ModalHeader>
                    <ScrollView>
                        <ModalBody>
                            {order.length === 0 ? (
                                <Text>
                                    Your cart is empty
                                </Text>
                            ) : (

                                order.map((product: { id: React.Key | null | undefined; }) => (
                                    <Order
                                        key={product.id}
                                        product={product} />
                                ))

                            )}

                        </ModalBody>
                    </ScrollView>
                    <ModalFooter>
                        <Text fontWeight="$bold" fontSize="$xl" mr={50}>Total: ${total}</Text>

                        <Button
                            size="sm"
                            action="secondary"
                            mr="$3"
                            onPress={() => {
                                handleClickModalCart()
                            }}
                        >
                            <ButtonText>Close</ButtonText>
                        </Button>
                        <Button
                            size="sm"
                            bg="$yellow500"
                            $active-bg="$yellow600"
                            borderWidth="$0"
                            onPress={() => {
                                setShowAlertCart(true);
                            }}
                            disabled={disableCheckoutBtn()}
                        >
                            <ButtonText>Ckeckout</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

    )
}

