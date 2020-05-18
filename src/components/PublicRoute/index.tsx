import React from 'react'
import { Route, Redirect,RouteProps } from 'react-router-dom'
//redux stuff
import { connect } from 'react-redux'
interface MyRouteProps extends RouteProps{
    component:any;
    authenticated:boolean | null;
    rest?:any
}
const GuestRoute: React.FC<MyRouteProps>= ({ component: Component, authenticated, ...rest }) => {
    return (<Route
        {...rest}
        render={(props) =>
            <>
                {authenticated && <Redirect to='/'/>}
                {typeof authenticated === 'boolean' && !authenticated && <Component {...props}/>}
            </>
        }
    />)
};
const mapStateToProps = (state:any) => ({
    authenticated: state.auth.authenticated
});
export default connect(mapStateToProps)(GuestRoute)
