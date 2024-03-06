import { Box, Input, InputField, VStack, Text, InputIcon, InputSlot, FormControl, Heading, EyeIcon, EyeOffIcon, Button, ButtonText, ButtonIcon, AddIcon, Link, LinkText, Alert, AlertText } from '@gluestack-ui/themed';
import Auth_layout from './layouts/auth';
import { useContext, useState } from 'react';
import { ErrorContext } from '../context/errorContext';
import { useAuthentication } from '../auth/hooks/useAuthentication';
import React from 'react';


const Register = ({ navigation }: { navigation: any }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setConfirmPassword] = useState('');
    const { errors, clearErrors } = useContext(ErrorContext);


    const [showPassword, setShowPassword] = useState(false)
    const handleState = () => {
        setShowPassword((showState) => {
            return !showState
        })
    }
    const { signUp } = useAuthentication();

    const onHandleSignUp = () => {
        clearErrors();
        signUp({ name, email, password, password_confirmation });
    }

    const handleNavigate = () => {
        clearErrors();
        navigation.navigate('Login');
    };

    return (
        <>

            <Auth_layout />

            <Box
                mt={5}
            >
                <FormControl
                    p="$4"
                >
                    <VStack
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        space="lg"
                        mt={15}
                    >
                        <Heading $dark-color="$textLight200" size='2xl' style={{ textAlign: 'center' }}>
                            SubstanceTwins
                        </Heading>
                        <Text $dark-color="$textLight200" size='xl' style={{ textAlign: 'center' }}>
                            Your body must be prepared for any situation, which is why you need supplements.
                        </Text>
                        {errors ? errors.map(error => <Alert h={10} bgColor="$red300" variant="solid" key={error}><AlertText>{error}</AlertText></Alert>) : null}


                        <Input w={270} variant="rounded" >
                            <InputField
                                placeholder="Name"
                                type="text"
                                value={name}
                                onChangeText={setName}
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
                        <Input w={270} variant="rounded" >
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
                        mt={22}
                    >
                        <Input
                            w={270}
                            variant="rounded"
                        >
                            <InputField
                                placeholder="Password"
                                type={showPassword ? "text" : "password"}
                                value={password_confirmation}
                                onChangeText={setConfirmPassword}
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
                        mt={10}
                        mb="10%"
                        >
                    <Button
                        bg="$yellow500"
                        $active-bg="$yellow600"
                        w={90}
                        size="sm"
                        variant="solid"
                        isDisabled={false}
                        onPress={onHandleSignUp}
                    >
                        <ButtonText>Register</ButtonText>
                    </Button>
                    <Link onPress={handleNavigate}>
                        <LinkText>Already have an account?</LinkText>
                    </Link>
                </VStack>


            </FormControl>
        </Box >

        </>

    )
}
export default Register;