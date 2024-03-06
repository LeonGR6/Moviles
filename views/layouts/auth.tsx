import { Box, Text, Image, Heading } from '@gluestack-ui/themed';
import { ImageBackground, StyleSheet } from 'react-native';
import React from 'react';

const Auth_layout = () => {
    return (
        <ImageBackground
            source={require("/assets/images/auth_image.jpg")}
            alt='desc'
            style={styles.background}
        >

        </ImageBackground >
    )
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover', // Opcional: ajusta la imagen al tamaño del componente
        justifyContent: 'center', // Opcional: alinea el contenido en el centro
    },
});
export default Auth_layout;