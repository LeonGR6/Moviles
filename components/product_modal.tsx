import { Box, Button, ButtonText, CloseIcon, Heading, Icon, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Image, Text, VStack, ScrollView, SafeAreaView, View } from '@gluestack-ui/themed'
import React, { useEffect } from 'react'
import useCategory from '../hooks/useCategory'
import { useState } from 'react';
import ExpandableText from './ExpandableText';
import { FlatList, StyleSheet } from 'react-native';

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


    ///////Image Slider/////////
    const [containerWidth, setContainerWidth] = useState(0);
    const onContainerLayout = (event: { nativeEvent: { layout: { width: any; }; }; }) => {
        const { width } = event.nativeEvent.layout;
        setContainerWidth(width);
    };

    const [activeIndex, setActiveIndex] = useState(0);

    const OnBoardingItem = ({ item }: { item: any }) => {
        return (
            <Image
                source={{ uri: item.image_path }}
                style={{ width: containerWidth, height: containerWidth }}
                resizeMode='cover'
                alt='desc'
                key={product.images.id}
            />
        )
    }
    ///////////////////////////////////

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
                    <SafeAreaView>
                        <Box
                            maxWidth='100%'
                            onLayout={onContainerLayout}
                        >

                            <FlatList
                                data={product.images}
                                style={{ maxHeight: containerWidth }}
                                pagingEnabled
                                horizontal
                                initialScrollIndex={activeIndex}
                                onScroll={(event) => {
                                    const newIndex = Math.round(event.nativeEvent.contentOffset.x / containerWidth);
                                    setActiveIndex(newIndex);
                                }}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => <OnBoardingItem item={item} key={item.id} />}
                            />

                            {product.images.length > 1 ?
                                <View
                                    flexDirection='row'
                                    justifyContent='center'
                                    mt={10}
                                >
                                    {product.images.map((_: any, i: number) => (
                                        <View
                                            key={i}
                                            style={[styles.dot, { backgroundColor: i === activeIndex ? 'blue' : 'grey' }]}
                                        />
                                    ))}
                                </View>
                                : null
                            }
                        </Box>
                    </SafeAreaView>
                    <VStack>
                            <ExpandableText
                                text={product.description}
                                collapsedLines={1} />

                            <Box flex={1} flexDirection='row' justifyContent='space-between'>
                                <Text fontWeight='$bold' fontSize='$xl' mt={10} flexDirection='column'>
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
                                        style={{ width: 24, height: 24 }}
                                        resizeMode="contain"
                                        alt='desc'

                                    />
                                </Button>
                                <Text fontWeight='$bold' fontSize='$xl' mt={10} flexDirection='column'>
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
                                        style={{ width: 24, height: 24 }}
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
const styles = StyleSheet.create({
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 1,
    }
})
