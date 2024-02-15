import React, { useContext } from 'react';
import { Box, Input, InputField, VStack,  InputIcon, InputSlot, FormControl, EyeIcon, EyeOffIcon, Button, ButtonText, Link, LinkText, Alert,AlertText } from '@gluestack-ui/themed';
import Auth_layout from './layouts/auth';
import { useState } from 'react';
import { ErrorContext } from '../context/errorContext';
import { useAuthentication } from '../auth/hooks/useAuthentication';

const Login = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { errors, clearErrors } = useContext(ErrorContext);


    const handleState = () => {
        setShowPassword((showState) => {
            return !showState
        })
    }

    const { signIn } = useAuthentication();

    const onHandleSignIn = () => {
        signIn({ email, password });
    }
    const handleNavigate = () => {
        clearErrors(); 
        navigation.navigate('Register');
      };

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
                        mt={15}
                    >
                     {errors ? errors.map(error =><Alert h={10} bgColor="$red300" variant="solid" key={error}><AlertText>{error}</AlertText></Alert>) : null}

                        <Input w={270} variant="rounded"  >
                            <InputField
                                placeholder="Email"
                                type="text"
                                value={email}
                                onChangeText={setEmail}
                            />
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
                                value={password}
                                onChangeText={setPassword}
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
                            isDisabled={false}
                            onPress={onHandleSignIn}
                        >
                            <ButtonText>Login</ButtonText>
                        </Button>
                        <Link onPress={handleNavigate}>
                            <LinkText>Don´t have a account? click here to register</LinkText>
                        </Link>
                    </VStack>


                </FormControl>
            </Box>
        </Box>

    )
};
export default Login;