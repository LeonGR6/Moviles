import { Box, Image, Text, VStack, Button, ButtonText } from '@gluestack-ui/themed'
import React from 'react'
import { useAuthentication } from '../auth/hooks/useAuthentication';
import { signOut } from '../auth/actions';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../auth/context';

export default function LoggedUser() {

  const { signOut } = useAuthentication();
  const { user } = useAuth();


  const onHandleSignOut = () => {
    signOut();
  }
  return (
    <>
      <Box
        w='100%'
        h='100%'
        position='relative'
      >
        <Image
          h='100%'
          w='100%'
          source={require("/assets/images/account.jpg")}
          alt='desc'
        />
      </Box>

      <LinearGradient
        colors={['rgba(253, 224, 71, 0.05)', 'rgba(253, 224, 71, 0.05)']}

        style={{
          borderRadius: 20,
          backgroundColor: 'white',
          height: '100%',
          width: '100%',
          position: 'absolute',
          top: '50%',
          alignItems: 'center',
        }}
      >

        <Image
          mt={20}
          h={110}
          w={110}
          source={require('../assets/Icons/account.png')}
          alt='desc'

        />
        <VStack
          alignItems='center'
        >
          <Text $dark-color="$textLight200" size='lg' mt={22} style={{ textAlign: 'center' }}>
            Hi again {user?.user}
          </Text>
          <Button
            mt={50}
            bg="$yellow500"
            $active-bg="$yellow600"
            size="sm"
            w='fit-content'
            variant="solid"
            isDisabled={false}>
            <ButtonText>Edit information</ButtonText>
          </Button>
          <Button
            mt={50}
            bg="$yellow500"
            $active-bg="$yellow600"
            size="sm"
            w='fit-content'
            variant="solid"
            isDisabled={false}
            onPress={onHandleSignOut}
          >
            <ButtonText>Logout</ButtonText>
          </Button>
        </VStack>

      </LinearGradient>
    </>
  )
}
