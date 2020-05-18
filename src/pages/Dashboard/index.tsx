import React, {useEffect, useState} from 'react';
import './styles.scss';
import {getPosts} from "../../redux/actions/post.actions";
import {connect} from "react-redux";
import Grid from '@material-ui/core/Grid';
import PostItem from '../../components/PostItem';
import {PostItemModel, PostPropsModel} from "../../models/Post.model";


function Dashboard(props: PostPropsModel) {
    const [posts, setPosts] = useState<Array<PostItemModel>>([]);

    useEffect(() => {
        props.getPosts();
    }, []);

    useEffect(() => {
        if (props.post.posts) {
            setPosts(props.post.posts);
        }

    }, [props.post]);

    return (
        <Grid container spacing={4} style={{padding: 24}}>
            {posts.map((currentPost: any) => (
                <Grid key={currentPost.id} item xs={12} sm={6} lg={4} xl={3}>
                    <PostItem post={currentPost}/>
                </Grid>
            ))}
        </Grid>
    );
}

const mapStateToProps = (state: PostPropsModel) => ({
        post: state.post
});
const mapActionsToProps = {
    getPosts
};

export default connect(mapStateToProps, mapActionsToProps)(Dashboard)
