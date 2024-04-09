import React, { useContext } from 'react';
import { Box, Input, InputField, VStack, InputIcon, InputSlot, FormControl, EyeIcon, Text, Heading, EyeOffIcon, Button, ButtonText, Link, LinkText, Alert, AlertText } from '@gluestack-ui/themed';
import Auth_layout from './layouts/auth';
import { useState } from 'react';
import { ErrorContext } from '../context/errorContext';
import { useAuthentication } from '../auth/hooks/useAuthentication';
import { Formik } from 'formik';

const Login = ({ navigation }: { navigation: any }) => {
    const [showPassword, setShowPassword] = useState(false);
    const { clearErrors } = useContext(ErrorContext);
    const { signIn } = useAuthentication();

    const handleState = () => {
        setShowPassword((showState) => !showState);
    }

    const handleNavigate = () => {
        clearErrors();
        navigation.navigate('Register');
    };

    return (
        <>
            <Auth_layout />
            <Box mt={5}>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                        const errors: any = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = 'Invalid email address';
                        }
                        if (!values.password) {
                            errors.password = 'Required';
                        }
                        return errors;
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        clearErrors();
                        await signIn(values);
                        setSubmitting(false);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <FormControl p="$4" borderRadius="$lg">
                            <VStack alignItems='center' justifyContent='center' space="lg" mt={15}>
                                <Heading $dark-color="$textLight200" size='2xl' style={{ textAlign: 'center' }}>
                                    SubstanceTwins
                                </Heading>
                                <Text $dark-color="$textLight200" size='xl' style={{ textAlign: 'center' }}>
                                    Your body must be prepared for any situation, which is why you need supplements.
                                </Text>
                                {errors.email && touched.email && <Alert h={10} bgColor="$red300" variant="solid"><AlertText>{errors.email}</AlertText></Alert>}
                                <Input w={270} variant="rounded">
                                    <InputField
                                        placeholder="Email"
                                        type="text"
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                    />
                                </Input>
                                {errors.password && touched.password && <Alert h={10} bgColor="$red300" variant="solid"><AlertText>{errors.password}</AlertText></Alert>}
                                <Input w={270} variant="rounded">
                                    <InputField
                                        placeholder="Password"
                                        type={showPassword ? "text" : "password"}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                    />
                                    <InputSlot pr="$3" onPress={handleState}>
                                        <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} color="$yellow500" />
                                    </InputSlot>
                                </Input>
                                <Button
                                    bg="$yellow500"
                                    $active-bg="$yellow600"
                                    w={90}
                                    size="sm"
                                    variant="solid"
                                    onPress={() => handleSubmit()}
                                    disabled={isSubmitting}
                                >
                                    <ButtonText>{isSubmitting ? 'Logging in...' : 'Login'}</ButtonText>
                                </Button>
                                <Link onPress={handleNavigate}>
                                    <LinkText>Don't have an account? Click here to register</LinkText>
                                </Link>
                            </VStack>
                        </FormControl>
                    )}
                </Formik>
            </Box>
        </>
    );
};

export default Login;
