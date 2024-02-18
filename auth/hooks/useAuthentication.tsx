import clientAxios from "../../config/axios";
import { ErrorContext } from "../../context/errorContext";
import { AuthContext, useAuth, useAuthDispatch } from "../context";
import { AuthActionTypes, LoginFormValues, RegisterFormValues } from "../types";

import { useContext } from "react";

export const useAuthentication = () => {
    const state = useAuth();
    const dispatch = useAuthDispatch();
    const { errors, setErrors } = useContext(ErrorContext);
    const { user } = useAuth();



    ////Function of Login////

    const signIn = async ({ email, password }: LoginFormValues) => {
        try {
            const response = await clientAxios.post('/api/login', { email, password });
            const accessToken = response?.data.accessToken;
            const user = response?.data.user.name;

            dispatch({
                type: AuthActionTypes.SIGN_IN,
                payload: { accessToken ,user }
            })
        } catch (error: any) {
            setErrors(Object.values(error.response.data.errors))

        }




    }


    /////Function of logout////

    const signOut = async () => {

        if (user?.accessToken) {
            const accessToken = user.accessToken;
            console.log(accessToken);
            const response = await clientAxios.post('/api/logout', {}, {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                  }
            });
            if (response.status === 200) {
                console.log('Logout exitoso');
            } else {
                console.log('Error en el logout');
            }
            dispatch({
                type: AuthActionTypes.SIGN_OUT,
            })

          } else {
            console.log('El objeto user es null');
          }        
       
    }



    ////Function of Register///

    const signUp = async ({ name, email, password, password_confirmation }: RegisterFormValues) => {
        try {
            const response = await clientAxios.post('/api/register', { name, email, password, password_confirmation });
            const accessToken = response?.data.accessToken;
            const user =response?.data.user.name;


            dispatch({
                type: AuthActionTypes.SIGN_UP,
                payload: { accessToken,user }
            })
        } catch (error: any) {
            setErrors(Object.values(error.response.data.errors))
        }

    }



    //////Function of restoreToken////
    const restoreToken = async () => {
        try {
            //const accessToken= await AsyncStorage.getItem('accessToken');
            let accessToken = '';
            let user = '';

            if (accessToken) {
                dispatch({
                    type: AuthActionTypes.RESTORE_TOKEN,
                    payload: { accessToken,user }
                })
            }
        } catch (error) { }
    };


    return {
        ...state,
        signIn,
        signUp,
        signOut,
        restoreToken,
    }
};
