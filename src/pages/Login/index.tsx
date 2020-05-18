import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import './styles.scss';
import {ValidatedInput} from '../../components'
import {loginUser, clearErrors} from '../../redux/actions/auth.actions';
import {
    UserDataModel,
    LoginErrorModel,
    LoginPropsModel,
} from '../../models/Login.model';

function Login(props: LoginPropsModel) {
    const [values, setValues] = useState<UserDataModel>({
        userName: '',
        password: ''
    } as UserDataModel);
    const [errors, setErrors] = useState<LoginErrorModel>({});
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        if (props.UI.errors) {
            setErrors({
                password: props.UI.errors.data?.description,
                status: props.UI.errors.status
            });
        } else {
            setErrors({} as LoginErrorModel);
        }
        setLoading(props.UI.loading);
    }, [props.UI]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setLoading(true);
        //validation
        const errorData = validateFields(values as LoginErrorModel);
        if (Object.keys(errorData).length !== 0) {
            return setErrors(errorData);
        }
        const userData: UserDataModel = {
            userName: values.userName,
            password: values.password,
        };
        props.loginUser(userData);
    };

    const handleChange = (e: any) => {
        props.clearErrors();
        e.persist();
        setValues(values => ({
            ...values,
            [e.target.name]: e.target.value
        }));
    };

    const validateFields = (values: LoginErrorModel) => {
        const errors = {} as LoginErrorModel;
        if (!values.userName) {
            errors.userName = 'UserName is required'
        }
        if (!values.password) {
            errors.password = 'Password is required';
        }
        return errors;
    };

    return (
        <div className='pageWrapper'>
            <Container maxWidth="md" className='pageContainer'>
                <Paper elevation={3}>
                    <form className='boxWrapper' onSubmit={handleSubmit}>
                        <Typography className='textWelcome' color="textSecondary" variant="subtitle1">Welcome
                            Back!</Typography>
                        <ValidatedInput
                            value={values.userName}
                            name='userName'
                            label='User name'
                            type='text'
                            handleChange={handleChange}
                            errors={errors}
                        />
                        <ValidatedInput
                            value={values.password}
                            name='password'
                            label='Password'
                            type='password'
                            handleChange={handleChange}
                            errors={errors}
                        />
                        <Box my={3}>
                            <Button type="submit" disabled={loading}
                                    variant="contained" color="primary" disableElevation fullWidth size="large">Log
                                In</Button>
                        </Box>
                    </form>
                </Paper>
            </Container>
        </div>
    );
}

const mapStateToProps = (state: LoginPropsModel) => ({
    UI: state.UI
});
const mapActionsToProps = {
    loginUser,
    clearErrors
};
export default connect(mapStateToProps, mapActionsToProps)(Login)
