import { Box, Button, ButtonText, CloseIcon, Icon, Input, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Image, VStack, SafeAreaView, View, InputField, Text, ScrollView, AlertText, Alert, FormControl } from '@gluestack-ui/themed'
import React from 'react'
import { useState } from 'react';
import { FlatList, KeyboardAvoidingView, StyleSheet } from 'react-native';
import useCategory from '../../../hooks/useCategory';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';



export default function Product_modalAdminEmpty({ }) {

    const { handleClickAdminEmpty,
        modalAdminEmpty,
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
                return;
            }

            const selectedImages = result.assets.map((image, index) => {
                return {
                    id: image.fileName,
                    name: image.fileName || `temp_image_${index}.jpg`,
                    type: `image/${image.uri.split('.').pop()}`,
                    uri: image.base64,
                    url: image.uri

                };
            });

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

    const handleSubmit = async (values: { nameEdit: any; descriptionEdit: any; categoryEdit: any; priceEdit: any; }) => {
        setNameEdit(values.nameEdit);
        setDescriptionEdit(values.descriptionEdit);
        setCategoryEdit(values.categoryEdit);
        setPriceEdit(values.priceEdit);

        setShowAlertEdit(true);
    }

    return (
        <>
            <Modal
                isOpen={modalAdminEmpty}
                onClose={() => {
                    handleClickAdminEmpty();
                }}
                size="full"
                p={20}
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
                        <Formik
                            initialValues={{
                                nameEdit: nameEdit ? String(nameEdit) : '',
                                descriptionEdit: descriptionEdit ? String(descriptionEdit) : '',
                                categoryEdit: categoryEdit ? String(categoryEdit) : '',
                                priceEdit: priceEdit ? String(priceEdit) : '',
                            }}
                            onSubmit={handleSubmit}
                            validate={values => {
                                const errors: any = {};
                                if (!values.nameEdit) {
                                    errors.nameEdit = 'Name is required';
                                }
                                if (!values.descriptionEdit) {
                                    errors.descriptionEdit = 'Description is required';
                                }
                                if (!values.categoryEdit) {
                                    errors.categoryEdit = 'Category is required';
                                }
                                if (!values.priceEdit) {
                                    errors.priceEdit = 'Price is required';
                                }
                                return errors;
                            }}
                        >
                            {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
                                <FormControl>
                                    <ModalBody maxHeight={500}>
                                        <ScrollView>
                                            <VStack>
                                                <React.Fragment>
                                                    {errors.nameEdit && touched.nameEdit && (
                                                        <Alert bg="$red300" variant="solid">
                                                            <AlertText>{errors.nameEdit}</AlertText>
                                                        </Alert>
                                                    )}
                                                </React.Fragment>
                                                <Input>
                                                    <InputField
                                                        type='text'
                                                        placeholder='Name'
                                                        value={values.nameEdit}
                                                        onChangeText={handleChange('nameEdit')}
                                                        onBlur={handleBlur('nameEdit')} />
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
                                                            renderItem={({ item }) => <OnBoarding item={item} key={item.id} />} />

                                                        {images.length > 1 ?
                                                            <View
                                                                flexDirection='row'
                                                                justifyContent='center'
                                                                mt={10}
                                                            >
                                                                {images.map((_: any, i: number) => (
                                                                    <View
                                                                        key={i}
                                                                        style={[styles.dot, { backgroundColor: i === activeIndex ? 'blue' : 'grey' }]} />
                                                                ))}
                                                            </View>
                                                            : null}
                                                    </Box>
                                                </SafeAreaView>
                                                <Button
                                                    size="sm"
                                                    action="secondary"
                                                    mt="$3"
                                                    onPress={() => {
                                                        handleImagePickerPress();
                                                    }}
                                                >
                                                    <ButtonText>Choose images</ButtonText>
                                                </Button>
                                            </VStack>
                                            <VStack>
                                                <VStack mt={30}>
                                                    <Input>
                                                        <InputField
                                                            placeholder='Description'
                                                            value={values.descriptionEdit}
                                                            onChangeText={handleChange('descriptionEdit')}
                                                            onBlur={handleBlur('descriptionEdit')} />
                                                    </Input>
                                                    <React.Fragment>
                                                        {errors.descriptionEdit && touched.descriptionEdit && (
                                                            <Alert bg="$red300" variant="solid">
                                                                <AlertText>{errors.descriptionEdit}</AlertText>
                                                            </Alert>
                                                        )}
                                                    </React.Fragment>
                                                </VStack>

                                                <VStack mt={30}>
                                                    <Text size='xs'>Protein=1  Creatine=2  PreWorkout=3</Text>
                                                    <Input>
                                                        <InputField
                                                            placeholder='Category'
                                                            value={values.categoryEdit}
                                                            onChangeText={handleChange('categoryEdit')}
                                                            onBlur={handleBlur('categoryEdit')} />
                                                    </Input>
                                                    <React.Fragment>
                                                        {errors.categoryEdit && touched.categoryEdit && (
                                                            <Alert bg="$red300" variant="solid">
                                                                <AlertText>{errors.categoryEdit}</AlertText>
                                                            </Alert>
                                                        )}
                                                    </React.Fragment>
                                                </VStack>


                                                <VStack mt={30}>
                                                    <Input>
                                                        <InputField
                                                            placeholder='Price'
                                                            value={values.priceEdit}
                                                            onChangeText={handleChange('priceEdit')}
                                                            onBlur={handleBlur('priceEdit')} />
                                                    </Input>
                                                    <React.Fragment>
                                                        {errors.priceEdit && touched.priceEdit && (
                                                            <Alert bg="$red300" variant="solid">
                                                                <AlertText>{errors.priceEdit}</AlertText>
                                                            </Alert>
                                                        )}
                                                    </React.Fragment>
                                                </VStack>

                                            </VStack>
                                        </ScrollView>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button
                                            size="sm"
                                            action="secondary"
                                            mr="$3"
                                            onPress={() => {
                                                handleClickAdminEmpty();

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
                                                handleSubmit();

                                            }}
                                        >
                                            <ButtonText>Add product</ButtonText>
                                        </Button>
                                    </ModalFooter>
                                </FormControl>

                            )}
                        </Formik>
                    </ModalContent>
                </KeyboardAvoidingView>
            </Modal >
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

