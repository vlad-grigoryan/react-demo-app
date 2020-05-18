import {GET_POST_BY_ID, GET_POSTS} from '../types';

const initialState: { posts: Array<any>, selectedPosts: Array<any> } = {
    posts: [],
    selectedPosts: []
};
export default function (state = initialState, action: any) {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload
            };
        case GET_POST_BY_ID:
            const matchPost = state.selectedPosts.find((post => {
                return post.id === action.payload.id;
            }));
            if (!matchPost) {
                return {
                    ...state,
                    selectedPosts: [...state.selectedPosts, ...[action.payload]]
                };
            } else {
                return state;
            }
        default:
            return state;
    }
}
