import React, {useState, setState, useReducer } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'

//#region useReducer
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
//#endregion useReducer

function FormSignup() {

    //#region useReducer
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const handleChange = (event) =>{
        dispatch({field: event.target.name, value: event.target.value})    
    }
    //#endregion useReducer

    //#region useReducer
    const {name, email, password, confirmPassword} = state;
    //#endregion useReducer

        return (
            <Grid md={12}>
            <form style={{ backgroundColor: '', opacity: '1', justifyContent: 'center'}} noValidate autoComplete="off">
                <h2 style={{color: '#ff5722'}}>Signup</h2>
                <FormControl style={{width: '100%'}}>
                    <TextField id="outlined-basic" style={{marginBottom: '5px', backgroundColor:'#E1E1E1'}} variant="outlined" label="Name" type="text" name="name" value={name} onChange={handleChange} />
                </FormControl>
                <br />
                <FormControl style={{width: '100%'}}>
                    <TextField id="outlined-basic" style={{marginBottom: '5px', backgroundColor:'#E1E1E1'}} color="#ff5722"  type="text" variant="outlined" label="Email" name="email" value={email} onChange={handleChange} />
                </FormControl>
                <br />
                <FormControl style={{width: '100%'}}>
                    <TextField id="outlined-basic" style={{marginBottom: '5px', backgroundColor:'#E1E1E1'}}  type="password" variant="outlined" label="Password" name="password" value={password} onChange={handleChange} />
                </FormControl>
                <br />
                <FormControl style={{width: '100%'}}>
                    <TextField id="outlined-basic" style={{marginBottom: '5px', backgroundColor:'#E1E1E1' }}  type="password" variant="outlined" label="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={handleChange} />
                </FormControl>
                <br />
                <FormControl  style={{width: '100%'}}>
                    <Button style={{backgroundColor: '#ff5722', color: '#ffffff'}} variant="contained">Signup</Button>
                </FormControl>
            </form>
            </Grid>
        )
}

export default FormSignup;