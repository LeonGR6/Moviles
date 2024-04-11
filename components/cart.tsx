import { Image, Text, ButtonText, Modal, ModalBackdrop, ModalContent, ModalHeader, Heading, ModalCloseButton, Icon, CloseIcon, ModalBody, ModalFooter, Button, View } from '@gluestack-ui/themed'
import React, { useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native';
import useCategory from '../hooks/useCategory';
import Order from './cart_order';

export default function Cart() {
    const ref = React.useRef(null)
    const { order, total, setShowAlertCart,handleClickModalCart,showModalCart} = useCategory();
    const disableCheckoutBtn = () => order.length === 0;

    return (
        <View style={[styles.cart]}>
            <Button onPress={() => handleClickModalCart()} ref={ref} bgColor='$yellow300' borderRadius={360} hardShadow='5'>
                <Image
                    source={require('../assets/Icons/cart.png')}
                    style={{ width: 30, height: 30 }}
                    resizeMode="contain"
                    alt='desc'

                />
            </Button>
        </View>

    )
}
const styles = StyleSheet.create({
    cart: {
        position: 'absolute',
        bottom: 100,
        right: 30,
        zIndex: 10,
    }

});