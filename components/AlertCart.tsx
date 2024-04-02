import React from 'react'
import { AlertDialog, Icon, CloseIcon, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, Heading, AlertDialogCloseButton, AlertDialogBody, Text, AlertDialogFooter, ButtonGroup, Button, ButtonText, } from '@gluestack-ui/themed'
import useCategory from '../hooks/useCategory';

export default function AlertCart() {
    const { showAlertCart, setShowAlertCart, SubmitNewOrder } = useCategory();
    return (
        <AlertDialog
            isOpen={showAlertCart}
            onClose={() => {
                setShowAlertCart(false)
            }}
        >
            <AlertDialogBackdrop />
            <AlertDialogContent>
                <AlertDialogHeader>
                    <Heading size="lg">Confirm order</Heading>
                    <AlertDialogCloseButton>
                        <Icon as={CloseIcon} />
                    </AlertDialogCloseButton>
                </AlertDialogHeader>
                <AlertDialogBody>
                    <Text size="sm">
                        Are you sure you want to order this products? This action
                        cannot be undone.
                    </Text>
                </AlertDialogBody>
                <AlertDialogFooter>
                    <ButtonGroup space="lg">
                        <Button
                            variant="outline"
                            action="secondary"
                            onPress={() => {
                                setShowAlertCart(false)
                            }}
                        >
                            <ButtonText>Cancel</ButtonText>
                        </Button>
                        <Button
                            action="positive"
                            onPress={() => {
                                setShowAlertCart(false);
                                SubmitNewOrder();

                            }}
                        >
                            <ButtonText>Confirm order</ButtonText>
                        </Button>
                    </ButtonGroup>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
