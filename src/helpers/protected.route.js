import React, { Component, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom';
import cookie from 'js-cookie';
import { connect } from 'react-redux';
import { getMe } from '../actions/user.actions'
import NavbarLogedInd from '../components/NavbarLogedInd'

function ProtectedRoute({compoenent: Component, ...rest}) {

    // useEffect(() => {
    //     rest.dispatch(getMe());
    // }, [])
    console.log('res user token in protected route: ', rest);
    if(rest.user.user === undefined) {
        return <Route render= {(props) => <Redirect to={{pathname: "/",state: {from: props.location}}} />} />
    } else if(rest.user.user.token !== undefined) {
        return <div><NavbarLogedInd /> <Route {...rest} render= {
                    (props) => <Component {...props} {...rest}/>
        } /></div>
    } 
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        loading: state.user.loading,
        hasErrors: state.user.hasErrors
    }
}

export default connect(mapStateToProps)(ProtectedRoute);
// export default ProtectedRoute;
