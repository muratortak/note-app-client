import React, { useReducer } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import axios from 'axios';

//#region useReducer
const initialState = {
    email: '',
    password: ''
}

function reducer(state, {field, value}) {
    return {
        ...state,
        [field]: value
    }
}
//#endregion useReducer

function FormComponent() {

    //#region useReducer
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const handleChange = (event) => {
        dispatch({field: event.target.name, value: event.target.value})    
    }
    //#endregion useReducer

    //#region useReducer
    const {userName, password} = state;
    //#endregion useReducer


    const submitForm = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/login', state)
        .then(res => {
            console.log('login success: ', res);
            
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <form onSubmit={submitForm} noValidate autoComplete="off">
        <FormControl>
            <InputLabel htmlFor="component-simple">Email</InputLabel>
            <Input id="component-simple" type="text" name="userName" value={userName} onChange={handleChange}></Input>
        </FormControl>
        <br />
        <FormControl>
            <InputLabel htmlFor="component-simple">Password</InputLabel>
            <Input id="component-simple" type="password" name="password" value={password} onChange={handleChange}></Input>
        </FormControl>
        <br />
        <FormControl>
            <Button type="submit">Login</Button>
        </FormControl>
    </form>
    )
}

export default FormComponent;