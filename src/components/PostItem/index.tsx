import React from 'react'
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Box from "@material-ui/core/Box";

const PostItem = (props: any) => {
    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h6">
                    <Box fontWeight={600}>
                        {props.post.title}
                    </Box>
                </Typography>
                <Typography variant="body2">
                    {props.post.body}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={`post/${props.post.id}`}>More info</Link>
            </CardActions>
        </Card>
    )
};

export default PostItem
