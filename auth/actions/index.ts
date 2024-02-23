import { AuthAction, AuthActionTypes } from "../types";

export const signIn = ({ accessToken }: { accessToken: string }, { user }: { user: string }, { admin }: { admin: number }, { nameuser }: { nameuser: string }): AuthAction => ({
    type: AuthActionTypes.SIGN_IN,
    payload: { accessToken, user, admin, nameuser },
});
export const signOut = (): AuthAction => ({
    type: AuthActionTypes.SIGN_OUT,
});
export const signUp = ({ accessToken }: { accessToken: string }, { user }: { user: string }, { admin }: { admin: number }, { nameuser }: { nameuser: string }): AuthAction => ({
    type: AuthActionTypes.SIGN_UP,
    payload: { accessToken, user, admin, nameuser },
});
export const restoreToken = ({ accessToken }: { accessToken: string }, { user }: { user: string }, { admin }: { admin: number }, { nameuser }: { nameuser: string }): AuthAction => ({
    type: AuthActionTypes.RESTORE_TOKEN,
    payload: { accessToken, user, admin, nameuser },
});
