import React from 'react'
import { AlertDialog, Icon, CloseIcon, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, Heading, AlertDialogCloseButton, AlertDialogBody, Text, AlertDialogFooter, ButtonGroup, Button, ButtonText, } from '@gluestack-ui/themed'
import useCategory from '../../../hooks/useCategory'

export default function AlertOrders() {


    const { showAlertOrders, setShowAlertOrders, orderUpdate, makeStatusCompleted, makeStatusShipped, deleteOrder, setOrderUpdate } = useCategory();




    return (
        <>
            <AlertDialog
                isOpen={showAlertOrders}
                onClose={() => {
                    setShowAlertOrders(false)
                }}
            >
                <AlertDialogBackdrop />
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <Heading size="lg">Update status</Heading>
                        <AlertDialogCloseButton>
                            <Icon as={CloseIcon} />
                        </AlertDialogCloseButton>
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        <Text size="sm">
                            Are you sure you want to change the state of this order? This action cannot
                            be undone.
                        </Text>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <ButtonGroup space="lg">
                            <Button
                                variant="outline"
                                action="secondary"
                                onPress={() => {
                                    setShowAlertOrders(false);
                                }}
                            >
                                <ButtonText>Cancel</ButtonText>
                            </Button>
                            {orderUpdate.order_statuses_id === 1 ? (
                                <>
                                    <Button
                                        action="positive"
                                        onPress={() => {
                                            makeStatusShipped(orderUpdate.id);
                                            setShowAlertOrders(false);

                                        }}
                                    >
                                        <ButtonText>Confirm</ButtonText>
                                    </Button>
                                </>
                            ) : orderUpdate.order_statuses_id === 2 ? (
                                <>
                                    <Button
                                        action="positive"
                                        onPress={() => {
                                            makeStatusCompleted(orderUpdate.id);
                                            setShowAlertOrders(false);

                                        }}
                                    >
                                        <ButtonText>Confirm</ButtonText>
                                    </Button>
                                </>
                            ) : orderUpdate.order_statuses_id === 3 ? (
                                <>
                                    <Button
                                        action="positive"
                                        onPress={() => {
                                            deleteOrder(orderUpdate.id);
                                            setShowAlertOrders(false);
                                        }}
                                    >
                                        <ButtonText>Confirm</ButtonText>
                                    </Button>
                                </>
                            ) : <></>}

                        </ButtonGroup>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>


        </>
    )
}
