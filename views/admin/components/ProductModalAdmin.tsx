import { Box, Button, ButtonText, CloseIcon, Heading, Icon, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Image, VStack, SafeAreaView, View, Input, InputField, Text, ScrollView } from '@gluestack-ui/themed'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { FlatList, KeyboardAvoidingView, StyleSheet } from 'react-native';
import useCategory from '../../../hooks/useCategory';
import * as ImagePicker from 'expo-image-picker';


export default function Product_modalAdmin({ }) {

    const { handleClickAdmin,
        product,
        modalAdmin,
        setImages,
        images,
        nameEdit,
        descriptionEdit,
        priceEdit,
        setPriceEdit,
        setNameEdit,
        setDescriptionEdit,
        categoryEdit,
        setCategoryEdit,
        setShowAlertEdit,
    } = useCategory();


    //////////Image picker//////////////////

    const handleImagePickerPress = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: true,
                selectionLimit: 2,
                exif: true,
                quality: 0.8,
                base64: true,
            });

            if (result.canceled) {
                return; // Salir si no se seleccionaron imágenes o la base64 está vacía
            }

            const selectedImages = result.assets.map((image, index) => {
                return {
                    id: image.fileName,
                    name: image.fileName || `temp_image_${index}.jpg`,
                    type: `image/${image.uri.split('.').pop()}`, // Determinar el tipo de imagen
                    uri: image.base64,
                    url: image.uri

                };
            });

            // Actualizar el estado con las imágenes seleccionadas
            setImages(selectedImages);
        } catch (error) {
            console.error('Error al seleccionar imágenes:', error);
            alert('Error al seleccionar imágenes. Por favor, inténtalo de nuevo.');
        }
    };

    //////////////////////////////////////////////




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

    const OnBoarding = ({ item }: { item: any }) => {
        return (
            <Image
                source={{ uri: item.url }}
                style={{ width: containerWidth, height: containerWidth }}
                resizeMode='cover'
                alt='desc'
                key={item.id}
            />
        )
    }
    ///////////////////////////////////





    return (
        <>
            {
                product ? (
                    <KeyboardAvoidingView
                        behavior='position'
                        keyboardVerticalOffset={32}>
                        <Modal
                            isOpen={modalAdmin}
                            onClose={() => {
                                handleClickAdmin();
                            }}
                        >
                            <ModalBackdrop />
                            <ModalContent>
                                <ModalHeader>
                                    <ModalCloseButton>
                                        <Icon as={CloseIcon} />
                                    </ModalCloseButton>
                                </ModalHeader>
                                <ModalBody h={500}>
                                    <ScrollView>
                                        <VStack>
                                            <Text fontWeight='$bold' fontSize='$xl'>
                                                Name:
                                            </Text>
                                            <Input variant="outline" flexDirection='column' >
                                                <InputField type="text" fontSize='$xl' fontFamily="$body" value={nameEdit} onChangeText={setNameEdit} editable={true} />
                                            </Input>
                                        </VStack>
                                        <VStack mb={'$5'}>
                                            <Text fontWeight='$black' fontSize='$xl' mt={"$5"}>
                                                Images:
                                            </Text>
                                            <SafeAreaView mt={'$1'}>
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
                                            <Button
                                                size="sm"
                                                action="secondary"
                                                mt="$3"
                                                onPress={() => {
                                                    handleImagePickerPress()
                                                }}
                                            >
                                                <ButtonText>Change images</ButtonText>
                                            </Button>
                                        </VStack>
                                        <VStack>
                                            <Text fontWeight='$bold' fontSize='$xl'>
                                                Description:
                                            </Text>
                                            <Input variant="outline" h={200} >
                                                <InputField type="text" fontSize='$xl' fontFamily="$body" value={descriptionEdit} onChangeText={setDescriptionEdit} editable={true} multiline={true} h={'100%'} />
                                            </Input>
                                            <Text mt={"$5"} fontWeight='$bold' fontSize='$xl'>
                                                Category:
                                            </Text>
                                            <Input variant="outline" flexDirection='column' >
                                                <InputField type="text" fontSize='$xl' fontFamily="$body" value={String(categoryEdit)} onChangeText={setCategoryEdit} editable={true} />
                                            </Input>
                                            <Text mt={"$5"} fontWeight='$bold' fontSize='$xl'>
                                                Price:
                                            </Text>
                                            <Input variant="outline" flexDirection='column' >
                                                <InputField type="text" fontSize='$xl' fontFamily="$body" value={String(priceEdit)} onChangeText={setPriceEdit} editable={true} />
                                            </Input>

                                        </VStack>
                                    </ScrollView>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        size="sm"
                                        action="secondary"
                                        mr="$3"
                                        onPress={() => {
                                            handleClickAdmin();
                                        }}
                                    >
                                        <ButtonText>Cancel</ButtonText>
                                    </Button>
                                    <Button
                                        size="sm"
                                        borderWidth="$0"
                                        bg="$yellow500"
                                        $active-bg="$yellow600"
                                        onPress={() => {

                                            setShowAlertEdit(true);

                                        }}
                                    >
                                        <ButtonText>Save changes</ButtonText>
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal >
                    </KeyboardAvoidingView>
                ) : (

                    <Modal
                        isOpen={modalAdmin}
                        onClose={() => {
                            handleClickAdmin();
                        }}
                        size="full"
                    >
                        <ModalBackdrop />
                        <KeyboardAvoidingView
                            behavior='position'
                            keyboardVerticalOffset={32}>
                            <ModalContent>
                                <ModalHeader>
                                    <ModalCloseButton>
                                        <Icon as={CloseIcon} />
                                    </ModalCloseButton>
                                </ModalHeader>
                                <ModalBody h={500}>
                                    <ScrollView>
                                        <VStack>
                                            <Text fontWeight='$bold' fontSize='$xl'>
                                                Name:
                                            </Text>
                                            <Input variant="outline" flexDirection='column' >
                                                <InputField type="text" fontSize='$xl' fontFamily="$body" value={nameEdit} onChangeText={setNameEdit} editable={true} />
                                            </Input>
                                        </VStack>
                                        <VStack mb={'$5'}>
                                            <Text fontWeight='$black' fontSize='$xl' mt={"$5"}>
                                                Images:
                                            </Text>
                                            <SafeAreaView mt={'$1'}>
                                                <Box
                                                    maxWidth='100%'
                                                    onLayout={onContainerLayout}
                                                >

                                                    <FlatList
                                                        data={images}
                                                        style={{ maxHeight: containerWidth }}
                                                        pagingEnabled
                                                        horizontal
                                                        initialScrollIndex={activeIndex}
                                                        onScroll={(event) => {
                                                            const newIndex = Math.round(event.nativeEvent.contentOffset.x / containerWidth);
                                                            setActiveIndex(newIndex);
                                                        }}
                                                        showsHorizontalScrollIndicator={false}
                                                        keyExtractor={(item) => item.id}
                                                        renderItem={({ item }) => <OnBoarding item={item} key={item.id} />}
                                                    />

                                                    {images.length > 1 ?
                                                        <View
                                                            flexDirection='row'
                                                            justifyContent='center'
                                                            mt={10}
                                                        >
                                                            {images.map((_: any, i: number) => (
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
                                            <Button
                                                size="sm"
                                                action="secondary"
                                                mt="$3"
                                                onPress={() => {
                                                    handleImagePickerPress()
                                                }}
                                            >
                                                <ButtonText>Choose images</ButtonText>
                                            </Button>
                                        </VStack>
                                        <VStack>
                                            <Text fontWeight='$bold' fontSize='$xl'>
                                                Description:
                                            </Text>
                                            <Input variant="outline" h={200} >
                                                <InputField type="text" fontSize='$xl' fontFamily="$body" value={descriptionEdit} onChangeText={setDescriptionEdit} editable={true} multiline={true} h={'100%'} />
                                            </Input>
                                            <Text mt={"$5"} fontWeight='$bold' fontSize='$xl'>
                                                Category:
                                            </Text>
                                            <Input variant="outline" flexDirection='column' >
                                                <InputField type="text" fontSize='$xl' fontFamily="$body" value={categoryEdit} onChangeText={setCategoryEdit} editable={true} />
                                            </Input>
                                            <Text mt={"$5"} fontWeight='$bold' fontSize='$xl'>
                                                Price:
                                            </Text>
                                            <Input variant="outline" flexDirection='column' >
                                                <InputField type="text" fontSize='$xl' fontFamily="$body" value={priceEdit} onChangeText={setPriceEdit} editable={true} />
                                            </Input>

                                        </VStack>
                                    </ScrollView>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        size="sm"
                                        action="secondary"
                                        mr="$3"
                                        onPress={() => {
                                            handleClickAdmin();

                                        }}
                                    >
                                        <ButtonText>Cancel</ButtonText>
                                    </Button>
                                    <Button
                                        size="sm"
                                        borderWidth="$0"
                                        bg="$yellow500"
                                        $active-bg="$yellow600"
                                        onPress={() => {
                                            setShowAlertEdit(true);

                                        }}
                                    >
                                        <ButtonText>Add product</ButtonText>
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </KeyboardAvoidingView>
                    </Modal >

                )}
        </>
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
