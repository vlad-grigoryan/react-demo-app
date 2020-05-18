import {get} from '../../services/axiosConfig.service';
import {AppDispatch} from '../../models/Redux.model'
import {GET_POSTS, GET_POST_BY_ID} from "../types";
import {PostModel, CommentModel} from "../../models/Post.model";

export const getPosts = () => (dispatch: AppDispatch) => {
    get('posts')
        .then((response: any) => {
            dispatch({type: GET_POSTS, payload: response.data});
        })
};

export const getPostById = (id: string) => (dispatch: AppDispatch) => {
    let fullPostData: PostModel;
    get(`posts/${id}`)
        .then((response: {data: PostModel}) => {
            fullPostData = response.data;
            return get(`posts/${id}/comments`)
        })
        .then((comments: {data: Array<CommentModel>}) => {
            fullPostData.comments = comments.data;
            dispatch({type: GET_POST_BY_ID, payload: fullPostData});

        })
};
