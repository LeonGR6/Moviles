import React from 'react'
import { AlertDialog, Icon, CloseIcon, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, Heading, AlertDialogCloseButton, AlertDialogBody, Text, AlertDialogFooter, ButtonGroup, Button, ButtonText, } from '@gluestack-ui/themed'
import useCategory from '../hooks/useCategory';
import { useAuthentication } from '../auth/hooks/useAuthentication';

export default function AlertLogout() {
    const { showAlertLogout, setShowAlertLogout } = useCategory();
    const { signOut } = useAuthentication();

    return (
        <AlertDialog
            isOpen={showAlertLogout}
            onClose={() => {
                setShowAlertLogout(false)
            }}
        >
            <AlertDialogBackdrop />
            <AlertDialogContent>
                <AlertDialogHeader>
                    <Heading size="lg">Logout</Heading>
                    <AlertDialogCloseButton>
                        <Icon as={CloseIcon} />
                    </AlertDialogCloseButton>
                </AlertDialogHeader>
                <AlertDialogBody>
                    <Text size="sm">
                        Are you sure you want to logout? The session will
                        be clossed.
                    </Text>
                </AlertDialogBody>
                <AlertDialogFooter>
                    <ButtonGroup space="lg">
                        <Button
                            variant="outline"
                            action="secondary"
                            onPress={() => {
                                setShowAlertLogout(false)
                            }}
                        >
                            <ButtonText>Cancel</ButtonText>
                        </Button>
                        <Button
                            bg="$error600"
                            action="negative"
                            onPress={() => {
                                setShowAlertLogout(false);
                                signOut();
                            }}
                        >
                            <ButtonText>Confirm</ButtonText>
                        </Button>
                    </ButtonGroup>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
