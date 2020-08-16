import React, { Component } from 'react'
import Container from '@material-ui/core/Container';
import {Grid, Box} from '@material-ui/core';
import FormSignup from './FormSignup';
import FormLogin from './FormLogin';
import Slide  from './Slide';
import Navbar from './Navbar';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import { history } from '../helpers/history';

function Home() {

  return (
    // // <Container>
    //   {/* <Box> */}
    //     /* <Grid sm={12} container spacing={4}> */
          <Grid md={12} sm={12}>
            <Slide />
          </Grid>
    //     {/* </Grid> */}
    //   {/* </Box> */}
    // // </Container>
  );
}

export default Home;
