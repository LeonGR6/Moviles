import { Box, Image, Text, VStack, Button, ButtonText } from '@gluestack-ui/themed'
import React from 'react'

export default function UserStack() {
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

      <Box
        borderRadius={20}
        bgColor='white'
        h='100%'
        w='100%'
        position='absolute'
        top='50%'
        alignItems='center'
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
            You are not auhtenthicated, please press the button.
          </Text>
          <Button
            mt={50}
            bg="$yellow500"
            $active-bg="$yellow600"
            size="sm"
            w='fit-content'
            variant="solid"
            isDisabled={false}>
            <ButtonText>Authenthicate</ButtonText>
          </Button>
        </VStack>

      </Box>
    </>
  )
}
