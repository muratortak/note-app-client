import React from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { googleLogin } from '../actions/user.actions';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT;

function GoogleLoginComp(props) {
    const onSuccess = (res) => {
        var email = res.profileObj.email;
        var googleId = res.googleId;
        var image = res.profileObj.imageUrl;
        props.dispatch(googleLogin({ email, accessToken: res.getAuthResponse().id_token, googleId, image }));
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
