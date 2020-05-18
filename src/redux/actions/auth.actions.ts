import {
    SET_ERRORS,
    LOADING_UI,
    CLEAR_ERRORS,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED
} from '../types';
import {FakeAuthorization} from '../../services/auth.service';
import {history} from '../../components';
import {AppDispatch} from '../../models/Redux.model';
import {UserDataModel, LoginErrorModel} from '../../models/Login.model';


export const loginUser = (userData: UserDataModel) => (dispatch: AppDispatch) => {
    dispatch({type: LOADING_UI});
    FakeAuthorization(userData)
        .then((token: any) => {
            if (token) {
                localStorage.setItem('token', token);
                dispatch({
                    type: SET_AUTHENTICATED,
                    payload: {token}
                });
            }
            dispatch({type: CLEAR_ERRORS});
            history.push('/')
        }).catch((err: any) => {
            const payload: LoginErrorModel = {
                status: err.response?.status,
                data: err.response?.data
            };
            dispatch({
                type: SET_ERRORS,
                payload
            })
    })
};

export const logoutUser = () => (dispatch: AppDispatch) => {
    localStorage.removeItem('token');
    dispatch({
        type: SET_UNAUTHENTICATED
    });
    history.push('/login');
};

export const clearErrors = () => (dispatch: AppDispatch) => {
    dispatch({type: CLEAR_ERRORS});
};
