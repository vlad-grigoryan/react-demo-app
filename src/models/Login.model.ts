import {ErrorModel} from './Fetch.model';

export interface UserDataModel {
    userName: string;
    password: string
}

export interface LoginErrorModel {
    [key: string]: string | number | undefined | ErrorModel | UserDataModel,
    status?: number,
    userName?: string,
    password?: string,
    data?: ErrorModel
}
export interface LoginPropsModel {
    UI: LoginConnectFirstArgumentModel,
    loginUser: (loginValues: UserDataModel) => void,
    clearErrors: () => void,
}

export interface LoginConnectFirstArgumentModel {
    errors: LoginErrorModel
    loading: boolean
}
export interface InputModel {
    type: string,
    name: string,
    label: string,
    value: string,
    errors: LoginErrorModel,
    handleChange: (e?: any) => void
}
