import React from 'react'
import {AlertDialog,Icon,CloseIcon,AlertDialogBackdrop,AlertDialogContent,AlertDialogHeader,Heading,AlertDialogCloseButton,AlertDialogBody,Text,AlertDialogFooter,ButtonGroup,Button,ButtonText,} from '@gluestack-ui/themed'
import useCategory from '../../../hooks/useCategory'

export default function Alert() {
    const { showAlertDialog, setShowAlertDialog } = useCategory();
    return (
            <AlertDialog
                isOpen={showAlertDialog}
                onClose={() => {
                    setShowAlertDialog(false)
                }}
            >
                <AlertDialogBackdrop />
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <Heading size="lg">Deactivate account</Heading>
                        <AlertDialogCloseButton>
                            <Icon as={CloseIcon} />
                        </AlertDialogCloseButton>
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        <Text size="sm">
                            Are you sure you want to deactivate your account? Your data will
                            be permanently removed and cannot be undone.
                        </Text>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <ButtonGroup space="lg">
                            <Button
                                variant="outline"
                                action="secondary"
                                onPress={() => {
                                    setShowAlertDialog(false)
                                }}
                            >
                                <ButtonText>Cancel</ButtonText>
                            </Button>
                            <Button
                                bg="$error600"
                                action="negative"
                                onPress={() => {
                                    setShowAlertDialog(false)
                                }}
                            >
                                <ButtonText>Deactivate</ButtonText>
                            </Button>
                        </ButtonGroup>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
    )
}
