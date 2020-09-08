import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';
import { loginFunc } from '../actions/user.actions';

const StyledDivLoading = styled.div`
  text-align: center;
  padding-top: 25px;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 5px; 
  background-color: #E1E1E1;
`;

const StyledButton = styled(Button)`
  background-color: #ff5722; 
  color: #ffffff;
`;

const StyledFormControl = styled(FormControl)`
  width: 100%;
`;

const StyledH2 = styled.h2`
  color: #ff5722;
`;

const initialState = {
  email: '',
  password: '',
};

function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value,
  };
}

function FormLogin(props) {
  const [credentialState, setCredentialState] = useReducer(reducer, initialState);
  const handleChange = (event) => {
    setCredentialState({ field: event.target.name, value: event.target.value });
  };
  const { userName, password } = credentialState;
  const submitForm = async (event) => {
    event.preventDefault();
    props.dispatch(loginFunc({ userName, password }));
  };

  return (
    <form onSubmit={submitForm} noValidate autoComplete="off">
      <StyledH2>Login</StyledH2>
      <StyledFormControl>
        <StyledTextField
          id="outlined-basic"
          type="text"
          label="Username"
          name="userName"
          variant="outlined"
          value={userName}
          onChange={handleChange}
        />
      </StyledFormControl>
      <StyledFormControl>
        <StyledTextField
          id="outlined-basic"
          type="password"
          label="Password"
          name="password"
          variant="outlined"
          value={password}
          onChange={handleChange}
        />
      </StyledFormControl>
      <StyledFormControl>
        <StyledButton variant="contained" type="submit">Login</StyledButton>
      </StyledFormControl>
      <div>{props.user.message}</div>
      <StyledDivLoading>
        {
            props.loading && <CircularProgress color="secondary" />
        }
      </StyledDivLoading>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    loading: state.user.loading,
    hasErrors: state.user.hasErrors,
  };
};

export default connect(mapStateToProps)(FormLogin);
