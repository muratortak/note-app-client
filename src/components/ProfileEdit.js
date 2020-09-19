import React, { useReducer, useState } from 'react';
import { Grid, Card, CardActionArea, CardMedia, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Input, InputLabel, IconButton } from '@material-ui/core';
import { connect } from 'react-redux';
import { updateProfile, unlockPWDFunc } from '../actions/user.actions';
import EditIcon from '@material-ui/icons/Edit';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import styled from 'styled-components';

const StyledGrid = styled(Grid)`
  align-items: flex-end;
`;

const StyledInputLabel = styled(InputLabel)`
  width: 100%;
  height: 100%;
`;

const StyledInput = styled(Input)`
  width: 100%;
  height: 100%;
`;

const StyledFormControl = styled(FormControl)`
  width: 100%;
`;

const StyledH2 = styled.h2`
  color: #ff5722;
`;

const StyledButton = styled(Button)`
  background-color: #ff5722; 
  color: #ffffff;
`;

const reducer = (state, {field, value}) => ({
  ...state,
  [field]: value,
});

const editableReducer = (state, {field, value}) => ({
  ...state,
  [field]: value,
});

function ProfileEdit(props) {
  var returnImage = new Image();
  returnImage = props.user.user.image;
  const initialState = {
    username: props.user.user.userName,
    email: props.user.user.email,
    image: returnImage,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    error: '',
    isDisabled: false,
    isPassword: false,
    isUnlocked: false,
  };

  const initialEditableState = {
    usernameeditable          : true,
    emaileditable             : true,
    currentPasswordeditable   : true,
    newPasswordeditable       : true,
    confirmPasswordeditable   : true,
  }

  const [value, setValue] = useReducer(reducer, initialState);
  const [editState, setEditState] = useReducer(editableReducer, initialEditableState);
  const {username, email, image, currentPassword, newPassword, confirmPassword, error, isDisabled, isUnlocked} = value;

  const handleChange = (event) => {
    setValue({ field: event.target.name, value: event.target.value });
    const isConfirmPassword = (event.target.name === "confirmPassword") ? true : false;
    if(isConfirmPassword) {
      var isMatch = confirmPasswordFunc(newPassword, event.target.value);
      var value = '';
      var isdisabled = false;
      if(!isMatch) {
        value = 'Passwords must match.';
        isdisabled = true;
      }
      setValue({ field: 'error', value: value });
      setValue({ field: 'isDisabled', value: isdisabled });
    }
  };

  const changeEditable = (name) => {
    var editable = name + 'editable';
    var value = false;
    
    if((name === "newPassword" || name === "confirmPassword") && !isUnlocked) {
      value = true;
    }
    
    setEditState({field: editable, value: value});
  }

  const confirmPasswordFunc = (newPassword, confirmPassword) => {
    if(newPassword !== confirmPassword) {
      return false;
    }
    if(newPassword.trim() === '' || confirmPassword.trim() === '') {
      return false;
    }
    return true;
  }

  const changeImage = (event) => {
    if(event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.addEventListener("load", function () {
        setValue({field: 'image', value: reader.result })
      }, false);
      if (event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  };

  const submitToUnlock = async (event) => {
    var unlockPWD = {currentPassword}
    var isUnlocked = await unlockPWDFunc(unlockPWD);
    setValue({ field: 'isUnlocked', value: isUnlocked });
  }

  const submitForm = async (event) => {
    // var isPasswordChanged = false;
    // var isImageChanged = false;
    // if(newPassword !== '' && confirmPassword !== '') {
    //   isPasswordChanged = true;
    // }
    // if(image !== null) {
    //   isImageChanged = true;
    // }
    event.preventDefault();
    var updatedProfile = {userName: username,email,image: image ,pwd: newPassword}
    props.dispatch(updateProfile(updatedProfile));
  };

  const { usernameeditable ,emaileditable,currentPasswordeditable,newPasswordeditable,confirmPasswordeditable } = editState;

  return (
    <Grid container>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <form onSubmit={submitForm} autoComplete="on">
          <StyledH2>Profile</StyledH2>
          <FormControl>
            <StyledGrid container>
              <Grid item xl={12} lg={12} md={6} sm={6} xs={6}>
                Avatar
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      id="avatar"
                      component="img"
                      alt="User PP"
                      src={image}
                      title="Profile Image"
                    />
                  </CardActionArea>
                </Card>
              </Grid>
            </StyledGrid>
          </FormControl>
          <FormControl>
            <Grid container spacing={0}>
              <Input 
                id="outlined-basic"
                label="Upload a new Image"
                type="file"
                onChange={changeImage} 
              />
            </Grid>
          </FormControl>
          <StyledFormControl>
            <StyledGrid container spacing={0}>
              <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
                <StyledInputLabel htmlFor="input-with-icon-adornment">Username</StyledInputLabel>
                <StyledInput
                  id="outlined-basic1"
                  type="text"
                  label="Username"
                  name="username"
                  variant="outlined"
                  readOnly={usernameeditable}
                  value={username}
                  onChange={handleChange}
                  required={true}
                />
              </Grid>
              <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                <IconButton onClick={() => changeEditable("username")}>
                  <EditIcon />
                </IconButton>
              </Grid>
            </StyledGrid>
          </StyledFormControl>
          <br />
          <StyledFormControl>
            <StyledGrid container spacing={0}>
              <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
                <StyledInputLabel htmlFor="input-with-icon-adornment">Email</StyledInputLabel>
                <StyledInput
                  id="outlined-basic2"
                  type="text"
                  label="Email"
                  name="email"
                  variant="outlined"
                  readOnly={emaileditable}
                  value={username}
                  onChange={handleChange}
                  required={true}
                />
              </Grid>
              <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                <IconButton onClick={() => changeEditable("email")}>
                  <EditIcon />
                </IconButton>
              </Grid>
            </StyledGrid>
          </StyledFormControl>
          <br />
          <StyledFormControl>
            <StyledGrid container spacing={0}>
              <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
                <StyledInputLabel htmlFor="input-with-icon-adornment">Password</StyledInputLabel>
                <StyledInput
                  id="outlined-basic3"
                  type="password"
                  label="Password"
                  name="currentPassword"
                  variant="outlined"
                  readOnly={currentPasswordeditable}
                  defaultValue=""
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                <IconButton onClick={() => changeEditable("currentPassword")}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={submitToUnlock}>
                  <LockOpenIcon/>
                </IconButton>
              </Grid>
            </StyledGrid>
          </StyledFormControl>
          <br />
          <StyledFormControl>
            <StyledGrid container spacing={0}>
              <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
                <StyledInputLabel htmlFor="input-with-icon-adornment">New Password</StyledInputLabel>
                <StyledInput
                  id="outlined-basic4"
                  type="text"
                  label="New Password"
                  name="newPassword"
                  variant="outlined"
                  readOnly={newPasswordeditable}
                  defaultValue=""
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                <IconButton onClick={() => changeEditable("newPassword")}>
                  <EditIcon />
                </IconButton>
              </Grid>
            </StyledGrid>
          </StyledFormControl>
          <br />
          <StyledFormControl>
            <StyledGrid container spacing={0}>
              <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
                <StyledInputLabel htmlFor="input-with-icon-adornment">Confirm Password</StyledInputLabel>
                <StyledInput
                  id="outlined-basic5"
                  type="text"
                  label="Confirm Password"
                  name="confirmPassword"
                  variant="outlined"
                  readOnly={confirmPasswordeditable}
                  defaultValue=""
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                <IconButton onClick={() => changeEditable("confirmPassword")}>
                  <EditIcon />
                </IconButton>
              </Grid>
            </StyledGrid>
          </StyledFormControl>
          <br />
          <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
            <p>{error}</p>
          </Grid>
          <br />
          <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
            <StyledFormControl>
              <StyledButton disabled={isDisabled} variant="contained" type="submit">Save</StyledButton>
            </StyledFormControl>
          </Grid>
        </form>
        </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});


export default connect(mapStateToProps)(ProfileEdit);
