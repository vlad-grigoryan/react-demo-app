import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import './styles.scss';
import {getPostById} from '../../redux/actions/post.actions';
import {PostModel, PostPropsModel} from "../../models/Post.model";

function Post(props: PostPropsModel) {
    const [selectedPost, setSelectedPost] = useState<PostModel | null>(null);

    useEffect(() => {
        const postId: string = props.match.params.postId;
        props.getPostById(postId);
    }, []);

    useEffect(() => {
        const postId: string = props.match.params.postId;
        if (props.post.selectedPosts && props.post.selectedPosts.length) {
            const matchPost :PostModel | undefined = props.post.selectedPosts.find((post: PostModel) => {
                return post.id === Number(postId);
            });
            if (matchPost) {
                setSelectedPost(matchPost);
            }
        }
    }, [props.post]);

    return (
        <Box className='post lg-p-top'>
            {selectedPost ?
                <div className='blogContentWrapper'>
                    <Grid container spacing={5}>
                        <Grid item md={12}>
                            <Card className='card'>
                                <Paper>
                                <Box pt={3} pr={3} pl={3} pb={2}>
                                    <Typography variant="h4">
                                        Post {selectedPost.id}
                                    </Typography>
                                </Box>
                                </Paper>
                                <Box p={3}>
                                    <Typography variant="h6" paragraph>
                                        {selectedPost.title}
                                    </Typography>
                                    <Typography paragraph>
                                        {selectedPost.body}
                                    </Typography>
                                    <Paper>
                                    <Typography className='' variant="h5" gutterBottom>
                                        Comments
                                    </Typography>
                                        {selectedPost.comments.map((comment:any) => (
                                            <Grid key={comment.id} container  className='comment-wrapper' wrap="nowrap" spacing={2}>
                                                <Grid item md={9}>
                                                    <h4 style={{ margin: 0, textAlign: "left" }}>
                                                        {comment.name}
                                                    </h4>
                                                    <Typography variant="body1" color="textSecondary">
                                                        {comment.email}
                                                    </Typography>
                                                    <Typography paragraph>
                                                        {comment.body}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        ))}

                                    </Paper>
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
                : 'loading'
            }
        </Box>
    );
}

const mapStateToProps = (state: PostPropsModel) => ({
    post: state.post
});
const mapActionsToProps = {
    getPostById
};

export default connect(mapStateToProps, mapActionsToProps)(Post)
