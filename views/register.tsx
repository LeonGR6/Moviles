import React, { useContext } from 'react';
import { Box, Input, InputField, VStack, InputIcon, InputSlot, FormControl, EyeIcon, Text, Heading, EyeOffIcon, Button, ButtonText, Link, LinkText, Alert, AlertText } from '@gluestack-ui/themed';
import Auth_layout from './layouts/auth';
import { useState } from 'react';
import { ErrorContext } from '../context/errorContext';
import { useAuthentication } from '../auth/hooks/useAuthentication';
import { Formik } from 'formik';
import { KeyboardAvoidingView } from 'react-native';

const Register = ({ navigation }: { navigation: any }) => {
    const [showPassword, setShowPassword] = useState(false);
    const { clearErrors } = useContext(ErrorContext);
    const { signUp } = useAuthentication();

    const handleState = () => {
        setShowPassword((showState) => !showState);
    }

    const handleNavigate = () => {
        clearErrors();
        navigation.navigate('Login');
    };

    return (
        <>
            <Auth_layout />

            <KeyboardAvoidingView
                behavior='position'
                keyboardVerticalOffset={32}>
                <Box bgColor='white' rounded={15}>
                    <Formik
                        initialValues={{ name: '', email: '', password: '', password_confirmation: '' }}
                        validate={values => {
                            const errors: any = {};
                            if (!values.name) {
                                errors.name = 'Required';
                            }
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                errors.email = 'Invalid email address';
                            }
                            if (!values.password) {
                                errors.password = 'Required';
                            }
                            if (!values.password_confirmation) {
                                errors.password_confirmation = 'Required';
                            } else if (values.password_confirmation !== values.password) {
                                errors.password_confirmation = 'Passwords do not match';
                            }
                            return errors;
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            clearErrors();
                            await signUp(values);
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
                            <FormControl p="$4" borderRadius="$lg" bottom={30}>
                                <VStack alignItems='center' justifyContent='center' space="lg" mt={15}>
                                    <Heading $dark-color="$textLight200" size='2xl' style={{ textAlign: 'center' }}>
                                        SubstanceTwins
                                    </Heading>
                                    <Text $dark-color="$textLight200" size='xl' style={{ textAlign: 'center' }}>
                                        Your body must be prepared for any situation, which is why you need supplements.
                                    </Text>
                                    <React.Fragment>
                                        {errors.name && touched.name && (
                                            <Alert bgColor="$red300" variant="solid">
                                                <AlertText>{errors.name}</AlertText>
                                            </Alert>
                                        )}
                                    </React.Fragment>


                                    <Input w={270} variant="rounded">
                                        <InputField
                                            placeholder="Name"
                                            type="text"
                                            onChangeText={handleChange('name')}
                                            onBlur={handleBlur('name')}
                                            value={values.name}
                                        />
                                    </Input>
                                    <React.Fragment>
                                        {errors.email && touched.email && (
                                            <Alert bgColor="$red300" variant="solid">
                                                <AlertText>{errors.email}</AlertText>
                                            </Alert>
                                        )}
                                    </React.Fragment>

                                    <Input w={270} variant="rounded">
                                        <InputField
                                            placeholder="Email"
                                            type="text"
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            value={values.email}
                                        />
                                    </Input>
                                    <React.Fragment>
                                        {errors.password && touched.password && (
                                            <Alert bgColor="$red300" variant="solid">
                                                <AlertText>{errors.password}</AlertText>
                                            </Alert>
                                        )}
                                    </React.Fragment>

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
                                    <React.Fragment>
                                        {errors.password_confirmation && touched.password_confirmation && (
                                            <Alert bgColor="$red300" variant="solid">
                                                <AlertText>{errors.password_confirmation}</AlertText>
                                            </Alert>
                                        )}
                                    </React.Fragment>
                                    <Input w={270} variant="rounded">
                                        <InputField
                                            placeholder="Confirm Password"
                                            type={showPassword ? "text" : "password"}
                                            onChangeText={handleChange('password_confirmation')}
                                            onBlur={handleBlur('password_confirmation')}
                                            value={values.password_confirmation}
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
                                        <ButtonText>{isSubmitting ? 'Registering...' : 'Register'}</ButtonText>
                                    </Button>
                                    <Link onPress={() => handleNavigate()}>
                                        <LinkText>Already have an account? Click here to login</LinkText>
                                    </Link>
                                </VStack>
                            </FormControl>
                        )}
                    </Formik>
                </Box>
            </KeyboardAvoidingView>

        </>
    );
};

export default Register;
