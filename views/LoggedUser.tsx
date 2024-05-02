import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Image, Text } from '@gluestack-ui/themed';
import { useAuthentication } from '../auth/hooks/useAuthentication';
import { useAuth } from '../auth/context';
import AlertLogout from '../components/AlertLogout';
import useCategory from '../hooks/useCategory';
import { useNavigation } from '@react-navigation/native';

export default function LoggedUser() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const { setShowAlertLogout } = useCategory();

  const onHandleSignOut = () => {
    setShowAlertLogout(true);
  };
  const handleEditInformation = () => {
    navigation.navigate('EditInformation'); 
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          source={require('/Applications/MAMP/htdocs/Moviles/assets/images/account.jpg')}
          style={styles.image}
          resizeMode="cover"
          alt=''
        />

        <View style={styles.infoBox}>
          <Text style={styles.userName}>
            Hi again {user?.admin === 1 ? 'administrator ' : ''}
            {user?.nameuser}
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleEditInformation}>
            <Text style={styles.buttonText}>Edit information</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onHandleSignOut}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AlertLogout />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  infoBox: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  userName: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#eab308',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
