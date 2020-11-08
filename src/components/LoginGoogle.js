import React from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { googleLogin } from '../actions/user.actions';

const clientId = process.env.GOOGLE_CLIENT;

function GoogleLoginComp(props) {
    const onSuccess = (res) => {
        var email = res.profileObj.email;
        var googleId = res.googleId;
        props.dispatch(googleLogin({ email, accessToken: res.getAuthResponse().id_token, googleId }));
    }

    const onFailure = (res) => {
        console.log(`Login failed res: ${res.error}\n details: ${res.details}`);
    }

    return (
        <div style={{width: '100%'}}>
            <GoogleLogin
                clientId={clientId}
                buttonText = "Login with Gmail"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={false}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      user: state.user.user,
      loading: state.user.loading,
      hasErrors: state.user.hasErrors,
    };
  };
  
export default connect(mapStateToProps)(GoogleLoginComp);
