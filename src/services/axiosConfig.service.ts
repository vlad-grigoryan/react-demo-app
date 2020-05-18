import axios from 'axios'
import Config from '../config';
import { AxiosRequestConfig }from 'axios';

const requestUrl = Config.apiHost;

let config: AxiosRequestConfig = {
    baseURL: `${requestUrl}`,
    timeout: 10000,
    responseType: 'json'
};

export const get = (url: string) => {
    return axios.get(url, config)
};

export const post = (url: string, data: any) => {
    return axios.post(url, data, config)
};

export const update = (url: string, data: any) => {
    return axios.put(url, data, config)
};
export const remove = (url: string) => {
    return axios.delete(url, config)
};
