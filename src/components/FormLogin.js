import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { loginFunc } from '../actions/user.actions';

// #region useReducer
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
// #endregion useReducer

function FormLogin({ dispatch, user, loading, hasErrors }) {

  // #region useReducer
  const [credentialState, dispatchIn] = useReducer(reducer, initialState);

  const handleChange = (event) => {
    dispatchIn({ field: event.target.name, value: event.target.value });
  };

  // #endregion useReducer
  // #region useReducer
  const { userName, password } = credentialState;
  // #endregion useReducer
  const submitForm = async (event) => {
    event.preventDefault();
    dispatch(await loginFunc({ userName, password }));
  };

  return (
    <form onSubmit={submitForm} noValidate autoComplete="off">
      <h2 style={{ color: '#ff5722' }}>Login</h2>
      <FormControl style={{ width: '100%' }}>
        <TextField
          id="outlined-basic"
          type="text"
          label="Username"
          name="userName"
          variant="outlined"
          style={{ marginBottom: '5px', backgroundColor: '#E1E1E1' }}
          color="#ff5722"
          value={userName}
          onChange={handleChange}
        />
      </FormControl>
      <br />
      <FormControl style={{ width: '100%' }}>
        <TextField
          id="outlined-basic"
          type="password"
          label="Password"
          name="password"
          variant="outlined"
          style={{ marginBottom: '5px', backgroundColor: '#E1E1E1' }}
          color="#ff5722"
          value={password}
          onChange={handleChange}
        />
      </FormControl>
      <br />
      <FormControl style={{ width: '100%' }}>
        <Button style={{ backgroundColor: '#ff5722', color: '#ffffff' }} variant="contained" type="submit">Login</Button>
      </FormControl>
      <FormControl style={{ width: '100%' }}>
        <div className="loading">
          {
              loading && <img width="100" src="https://media.giphy.com/media/iJOZwC1R7WVxAxs4Gs/giphy.gif" alt="" />
          }
        </div>
      </FormControl>
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
