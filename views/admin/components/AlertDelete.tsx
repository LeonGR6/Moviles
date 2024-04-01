import React from 'react'
import { AlertDialog, Icon, CloseIcon, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, Heading, AlertDialogCloseButton, AlertDialogBody, Text, AlertDialogFooter, ButtonGroup, Button, ButtonText, } from '@gluestack-ui/themed'
import useCategory from '../../../hooks/useCategory'

export default function AlertDelete() {
    const { showAlertDelete, setShowAlertDelete, product, deleteProduct } = useCategory();
    return (
        <AlertDialog
            isOpen={showAlertDelete}
            onClose={() => {
                setShowAlertDelete(false)
            }}
        >
            <AlertDialogBackdrop />
            <AlertDialogContent>
                <AlertDialogHeader>
                    <Heading size="lg">Delete product</Heading>
                    <AlertDialogCloseButton>
                        <Icon as={CloseIcon} />
                    </AlertDialogCloseButton>
                </AlertDialogHeader>
                <AlertDialogBody>
                    <Text size="sm">
                        Are you sure you want to delete this product? Will
                        be permanently removed and cannot be undone.
                    </Text>
                </AlertDialogBody>
                <AlertDialogFooter>
                    <ButtonGroup space="lg">
                        <Button
                            variant="outline"
                            action="secondary"
                            onPress={() => {
                                setShowAlertDelete(false)
                            }}
                        >
                            <ButtonText>Cancel</ButtonText>
                        </Button>
                        <Button
                            bg="$error600"
                            action="negative"
                            onPress={() => {
                                setShowAlertDelete(false);
                                deleteProduct(product.id);
                            }}
                        >
                            <ButtonText>Delete</ButtonText>
                        </Button>
                    </ButtonGroup>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
