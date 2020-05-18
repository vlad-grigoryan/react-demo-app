import React, {useEffect} from 'react';
import {Switch, Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createBrowserHistory} from 'history';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.scss';
import {Login, Dashboard, Post} from '../../pages';
import {CheckAuthentication} from '../../services/auth.service';
import {GuestRoute, PrivateRoute} from '../index'
import store from '../../redux/stores';

export const history = createBrowserHistory();

const App: React.FC = () => {
    useEffect(() => {
        CheckAuthentication();
    }, []);
    const theme = createMuiTheme({
        palette: {
            primary: { main: "#006097" },
            secondary: { main: "#F00956" },
            type: "light"
        }
    });
    return (
        <MuiThemeProvider  theme={theme}>
            <CssBaseline />
            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <PrivateRoute
                            exact
                            path='/'
                            component={Dashboard}/>
                        <PrivateRoute
                            path='/post/:postId'
                            component={Post}/>
                        <GuestRoute
                            path='/login'
                            component={Login}/>
                    </Switch>
                </Router>
            </Provider>
        </MuiThemeProvider>
    )
};

export default App;
