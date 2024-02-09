import { Box, Text, Image, Heading } from '@gluestack-ui/themed';

const Auth_layout = () => {
    return (
        <>
            <Box
                w='100%'
                h={250}
            >
                <Image
                    h='100%'
                    w='100%'
                    source={require("/assets/images/auth_image.jpg")}
                    alt='desc'

                />
            </Box>
            <Heading $dark-color="$textLight200" size='2xl' mt={22} style={{ textAlign: 'center' }}>
                SubstanceTwins
            </Heading>
            <Text $dark-color="$textLight200" size='xl' mt={22} style={{ textAlign: 'center' }}>
                Your body must be prepared for any situation, which is why you need supplements.
            </Text>
        </>
    )
}
export default Auth_layout;