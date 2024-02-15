import clientAxios from "../../config/axios";
import { ErrorContext } from "../../context/errorContext";
import { useAuth, useAuthDispatch } from "../context";
import { AuthActionTypes, LoginFormValues, RegisterFormValues } from "../types";

import { useContext } from "react";

export const useAuthentication = () => {
    const state = useAuth();
    const dispatch = useAuthDispatch();
    const { errors, setErrors } = useContext(ErrorContext);



    ////Function of Login////

    const signIn = async ({ email, password }: LoginFormValues) => {
        try {
            const response = await clientAxios.post('/api/login', { email, password });
            const accessToken = response?.data.accessToken;
            dispatch({
                type: AuthActionTypes.SIGN_IN,
                payload: { accessToken }
            })
        } catch (error:any) {
            setErrors(Object.values(error.response.data.errors))

        }




    }


    /////Function of logout////

    const signOut = async () => {
        dispatch({ type: AuthActionTypes.SIGN_OUT })
    }



    ////Function of Register///

    const signUp = async ({ name, email, password, password_confirmation }: RegisterFormValues) => {
        try {
            const response = await clientAxios.post('/api/register', { name, email, password, password_confirmation });
            const accessToken = response?.data.accessToken;


        dispatch({
            type: AuthActionTypes.SIGN_UP,
            payload: { accessToken }
        })
        } catch (error:any) {
            setErrors(Object.values(error.response.data.errors))
        }
      
    }



    //////Function of restoreToken////
    const restoreToken = async () => {
        try {
            //const accessToken= await AsyncStorage.getItem('accessToken');
            let accessToken = '';
            if (accessToken) {
                dispatch({
                    type: AuthActionTypes.RESTORE_TOKEN,
                    payload: { accessToken },
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
