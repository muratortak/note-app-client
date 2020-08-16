import React, { useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { updateProfile } from '../actions/user.actions';

const reducer = (state, {field, value}) => ({
  ...state,
  [field]: value,
});

const useStyles = makeStyles((theme) => (
  {
    root: {
      '& > *': {
        // margin: theme.spacing(1),
        // width: '100%',
        // left: '25%',
        // top: '25%',
      },
    },
  }));

function ProfileEdit(props) {
  const classes = useStyles();
  
  const initialState = {
    username: props.user.userName,
    email: props.user.email,
    currentPassword: '',
    password: '',
    confirmPassword: '',
  };

  const [value, setValue] = useReducer(reducer, initialState);

  const handleChange = (event) => {
    setValue({ field: event.target.name, value: event.target.value });
  };

  const {username, email, currentPassword, password, confirmPassword} = value;

  const submitForm = async (event) => {
    event.preventDefaul();
    props.dispatch(await updateProfile(
      {
        username,
        email,
        currentPassword,
        password,
        confirmPassword,
      },
    ));
  };

  return (
    <div className={classes.root}>
      <form onSubmit={submitForm} autoComplete="on">
        <h2 style={{color: '#ff5722'}}>Profile</h2>
        <FormControl>
          <TextField
            id="outlined-basic"
            type="text"
            label="Username"
            name="username"
            variant="outlined"
            value={username}
            onChange={handleChange}
          />
        </FormControl>
        <br />
        <FormControl>
          <TextField
            id="outlined-basic"
            type="text"
            label="Email"
            name="email"
            variant="outlined"
            value={email}
            onChange={handleChange}
          />
        </FormControl>
        <br />
        <FormControl>
          <TextField
            id="outlined-basic"
            type="text"
            label="Current Password"
            name="password"
            variant="outlined"
            value={currentPassword}
            onChange={handleChange}
          />
        </FormControl>
        <br />
        <FormControl>
          <TextField
            id="outlined-basic"
            type="text"
            label="Password"
            name="password"
            variant="outlined"
            value={password}
            onChange={handleChange}
          />
        </FormControl>
        <br />
        <FormControl>
          <TextField
            id="outlined-basic"
            type="text"
            label="Confirm Password"
            name="confirmPassword"
            variant="outlined"
            value={confirmPassword}
            onChange={handleChange}
          />
        </FormControl>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});


export default connect(mapStateToProps)(ProfileEdit);
