import { Box, Input, InputField, VStack, Text, InputIcon, InputSlot, FormControl, EyeIcon, EyeOffIcon, Button, ButtonText, ButtonIcon, AddIcon } from '@gluestack-ui/themed';
import Auth_layout from './layouts/auth';
import { useState } from 'react';


function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const handleState = () => {
        setShowPassword((showState) => {
            return !showState
        })
    }
    return (
        <Box
            h='100%'
            w='100%'
        >

            <Auth_layout />

            <Box
                mt={40}
            >
                <FormControl
                    p="$4"
                    borderRadius="$lg"
                >
                    <VStack
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        space="lg"
                        mt={22}
                    >
                        <Input w={270} variant="rounded" >
                            <InputField placeholder="Email" type="text" />
                        </Input>
                    </VStack>

                    <VStack
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        space="lg"
                        mt={22}
                    >
                        <Input
                            w={270}
                            variant="rounded"
                        >
                            <InputField
                                placeholder="Password"
                                type={showPassword ? "text" : "password"}
                            />
                            <InputSlot
                                pr="$3"
                                onPress={handleState}
                            >
                                <InputIcon
                                    as={showPassword ? EyeIcon : EyeOffIcon}
                                    color="$yellow500"
                                />
                            </InputSlot>
                        </Input>
                    </VStack>

                    <VStack
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        space="lg"
                        mt={22}>
                        <Button
                            bg="$yellow500"
                            $active-bg="$yellow600"
                            w={90}
                            size="sm"
                            variant="solid"
                            isDisabled={false}  >
                            <ButtonText>Login</ButtonText>
                        </Button>
                        <Text>Don´t have a account? click here to register</Text>
                    </VStack>


                </FormControl>
            </Box>
        </Box>

    )
}
export default Login;