import { AuthAction, AuthActionTypes } from "../types";

export const signIn = ({accessToken}:{accessToken:string},{user}:{user:string} ): AuthAction=>({
    type: AuthActionTypes.SIGN_IN,
    payload:{accessToken,user},
});
export const signOut = (): AuthAction=>({
    type: AuthActionTypes.SIGN_OUT,
});
export const signUp = ({accessToken}:{accessToken:string},{user}:{user:string}): AuthAction=>({
    type: AuthActionTypes.SIGN_UP,
    payload:{accessToken,user},
});
export const restoreToken = ({accessToken}:{accessToken:string},{user}:{user:string}): AuthAction=>({
    type: AuthActionTypes.RESTORE_TOKEN,
    payload:{accessToken,user},
});
