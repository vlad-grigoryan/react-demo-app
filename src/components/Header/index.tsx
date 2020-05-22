import React from 'react'
import Typography from '@material-ui/core/Typography'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

const Header = (props: any) => {
    return (
        <AppBar position="static" color='transparent'>
            <Toolbar>
                <Typography variant="h5" paragraph>
                    Demo App
                </Typography>
                <div className='sign-out-button'>
                    <Button color="secondary" variant="outlined" onClick={props.signOut}>Sign out</Button>
                </div>
            </Toolbar>
        </AppBar>
    )
};

export default Header
