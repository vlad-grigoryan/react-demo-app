import React from 'react';
import {TextField} from '@material-ui/core';
import './styles.scss';
import {InputModel} from '../../models/Login.model'

function ValidatedInput(props: InputModel) {
    return (
        <div className='root'>
            <TextField
                variant='outlined'
                margin='none'
                value={props.value}
                fullWidth
                id={props.name}
                label={props.label}
                name={props.name}
                type={props.type}
                onChange={props.handleChange}
                helperText={props.errors && props.errors[props.name]}
                error={!!(props.errors && (props.errors.status || props.errors[props.name]))}
            />
        </div>
    );
}

export default ValidatedInput;

