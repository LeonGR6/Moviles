import { ImageBackground, StyleSheet } from 'react-native';
import React from 'react';

const Auth_layout = () => {
    return (
        <ImageBackground
            source={require("/assets/images/auth_image.jpg")}
            alt='desc'
            style={styles.background}
        />

    )
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover', 
        justifyContent: 'center', 
    },
});
export default Auth_layout;