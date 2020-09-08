import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NavbarLogedInd from '../components/NavbarLogedInd'

function ProtectedRoute({compoenent: Component, ...rest}) {
    if(rest.user.user === undefined) {
        console.log("USER MESSAGE: ", rest.user.message);
        return <Route {...rest.user.message} render= {(props) => <Redirect to={{pathname: "/", state: {from: props.location}}} />} />
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
