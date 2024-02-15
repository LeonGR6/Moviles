import { AuthAction, AuthActionTypes } from "../types";

export const signIn = ({accessToken}:{accessToken:string}): AuthAction=>({
    type: AuthActionTypes.SIGN_IN,
    payload:{accessToken},
});
export const signOut = (): AuthAction=>({
    type: AuthActionTypes.SIGN_OUT,
});
export const signUp = ({accessToken}:{accessToken:string}): AuthAction=>({
    type: AuthActionTypes.SIGN_UP,
    payload:{accessToken},
});
export const restoreToken = ({accessToken}:{accessToken:string}): AuthAction=>({
    type: AuthActionTypes.RESTORE_TOKEN,
    payload:{accessToken},
});
