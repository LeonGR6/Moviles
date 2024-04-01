import React from 'react'
import { AlertDialog, Icon, CloseIcon, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, Heading, AlertDialogCloseButton, AlertDialogBody, Text, AlertDialogFooter, ButtonGroup, Button, ButtonText, } from '@gluestack-ui/themed'
import useCategory from '../../../hooks/useCategory'

export default function AlertEdit() {


    const { showAlertEdit, setShowAlertEdit, updateProduct, product, insertProduct } = useCategory();




    return (
        <>
            {product ? (
                <AlertDialog
                    isOpen={showAlertEdit}
                    onClose={() => {
                        setShowAlertEdit(false)
                    }}
                >
                    <AlertDialogBackdrop />
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <Heading size="lg">Update product</Heading>
                            <AlertDialogCloseButton>
                                <Icon as={CloseIcon} />
                            </AlertDialogCloseButton>
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            <Text size="sm">
                                Are you sure you want to edit this product? Changes cannot
                                be undone.
                            </Text>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <ButtonGroup space="lg">
                                <Button
                                    variant="outline"
                                    action="secondary"
                                    onPress={() => {
                                        setShowAlertEdit(false)
                                    }}
                                >
                                    <ButtonText>Cancel</ButtonText>
                                </Button>
                                <Button
                                    action="positive"
                                    onPress={() => {
                                        setShowAlertEdit(false);
                                        updateProduct();
                                    }}
                                >
                                    <ButtonText>Update</ButtonText>
                                </Button>
                            </ButtonGroup>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            ) : (
                <AlertDialog
                    isOpen={showAlertEdit}
                    onClose={() => {
                        setShowAlertEdit(false)
                    }}
                >
                    <AlertDialogBackdrop />
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <Heading size="lg">Add product</Heading>
                            <AlertDialogCloseButton>
                                <Icon as={CloseIcon} />
                            </AlertDialogCloseButton>
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            <Text size="sm">
                                Are you sure you want to add this product? This action cannot
                                be undone.
                            </Text>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <ButtonGroup space="lg">
                                <Button
                                    variant="outline"
                                    action="secondary"
                                    onPress={() => {
                                        setShowAlertEdit(false)
                                    }}
                                >
                                    <ButtonText>Cancel</ButtonText>
                                </Button>
                                <Button
                                    action="positive"
                                    onPress={() => {
                                        setShowAlertEdit(false);
                                        insertProduct();
                                    }}
                                >
                                    <ButtonText>Add product</ButtonText>
                                </Button>
                            </ButtonGroup>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}

        </>
    )
}
