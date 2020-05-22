import React from 'react'
import './styles.scss';
import {Route, Redirect, RouteProps} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutUser} from '../../redux/actions/auth.actions';
import Header from "../Header";


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
                    <Header signOut={signOut} />
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
