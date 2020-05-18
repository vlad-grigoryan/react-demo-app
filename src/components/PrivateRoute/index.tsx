import React from 'react'
import './styles.scss';
import {Route, Redirect, RouteProps} from 'react-router-dom'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {logoutUser} from '../../redux/actions/auth.actions';
import Typography from "@material-ui/core/Typography";


interface MyRouteProps extends RouteProps {
    component: any;
    authenticated: boolean | null;
}

const PrivateRoute: React.FC<MyRouteProps> = ({component: Component, authenticated, ...rest}: any) => {
    const signOut = () => {
        rest.logoutUser();
    };
    return (<Route
        {...rest}
        render={(props) =>
            <>
                {authenticated &&
                <>
                    <AppBar position="static" color='transparent'>
                        <Toolbar>
                            <Typography variant="h5" paragraph>
                                Demo App
                            </Typography>
                            <div className='sign-out-button'>
                                <Button color="secondary" variant="outlined" onClick={signOut}>Sign out</Button>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <Component {...props} >
                    </Component>
                </>
                }
                {typeof authenticated === 'boolean' && !authenticated && <Redirect to='/login'/>}
            </>
        }
    />)
};

const mapStateToProps = (state: any) => ({
    authenticated: state.auth.authenticated
});
const mapActionsToProps = {
    logoutUser
};
export default connect(mapStateToProps, mapActionsToProps)(PrivateRoute)
