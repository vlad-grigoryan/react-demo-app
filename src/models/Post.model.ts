import { RouteComponentProps } from 'react-router';

export interface PostItemModel {
    userId: number,
    title: string,
    id: number,
    body: string
}
export interface PostModel extends PostItemModel{
    comments: Array<CommentModel>
}
export interface CommentModel {
    body: string,
    email: string,
    id: number,
    name: string,
    postId: number
}

export interface PostPropsModel extends RouteComponentProps<MatchParams>{
    post: {
        selectedPosts?: Array<PostModel>,
        posts?: Array<PostItemModel>
    },
    getPostById: (postId: string) => void,
    getPosts: () => void
}
interface MatchParams {
        postId: string;
}
