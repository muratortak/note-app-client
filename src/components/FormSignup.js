import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import styled from 'styled-components';
import { registerUserFunc } from '../actions/user.actions';
import { registerUser } from '../services/user.service';

const StyledForm = styled.form`
    opacity: '1';
    justify-content: 'center';
`;

const StyledH2 = styled.h2`
    color: #ff5722;
`;
const StyledFormControl = styled(FormControl)`
    width: 100%;
`;

const StyledTextFiled = styled(TextField)`
    margin-bottom: 5px;
    background-color: #E1E1E1;
`;

const StyledButton = styled(Button)`
    background-color: #ff5722;
    color: #ffffff;
`;

const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
}

function reducer(state, {field, value}) {
    return {
        ...state,
        [field]: value
    }
}

function FormSignup(props) {

    const [state, dispatch] = useReducer(reducer, initialState);
    
    const handleChange = (event) =>{
        dispatch({field: event.target.name, value: event.target.value})    
    }

    const submitForm = (event) => {
        const registerForm = state;
        event.preventDefault();
        props.dispatch(registerUserFunc(registerForm));
    }
    
    const {name, email, password, confirmPassword} = state;

    return (
        <Grid md={12}>
        <StyledForm onSubmit={submitForm} noValidate autoComplete="off">
            <StyledH2>Signup</StyledH2>
            <StyledFormControl>
                <StyledTextFiled id="outlined-basic" type="text" variant="outlined" label="Name" name="name" value={name} onChange={handleChange} />
            </StyledFormControl>
            <StyledFormControl>
                <StyledTextFiled id="outlined-basic" type="text" variant="outlined" label="Email" name="email" value={email} onChange={handleChange} />
            </StyledFormControl>
            <StyledFormControl>
                <StyledTextFiled id="outlined-basic" type="password" variant="outlined" label="Password" name="password" value={password} onChange={handleChange} />
            </StyledFormControl>
            <StyledFormControl>
                <StyledTextFiled id="outlined-basic" type="password" variant="outlined" label="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={handleChange} />
            </StyledFormControl>
            <StyledFormControl>
                <StyledButton variant="contained" type="submit">Signup</StyledButton>
            </StyledFormControl>
        </StyledForm>
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
      loading: state.user.loading,
      hasErrors: state.user.hasErrors,
    };
};

export default connect(mapStateToProps)(FormSignup);