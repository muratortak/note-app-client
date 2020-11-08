import axios from 'axios';

export async function registerUser(registerForm) {
  let user;
  try {
    let response = await fetch('http://localhost:3000/user/signup', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(registerForm)
    });

    user = await response.text();
    user = JSON.parse(user);
    
    console.log('awaited user: ', user.user);
    return user;
  } catch(err) {
    console.log("Error registring a new user from response.");
    return false;
  }
}

export async function login(user) {
  let usr;
  try {
    let response = await fetch('http://localhost:3000/user/login', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    
    usr = await response.text();
    usr = JSON.parse(usr);
    
    console.log('awaited user: ', usr.user);
    
  } catch (err) {
    console.log('AXIOS ERR: ', err);
  }
  // return usr.data.user;
  return usr;
}

export async function googleLogin(user) {
  let usr;
  try {
    let response = await fetch('http://localhost:3000/user/loginoauth', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    
    usr = await response.text();
    usr = JSON.parse(usr);
    
    console.log('awaited user: ', usr.user);
    
  } catch (err) {
    console.log('AXIOS ERR: ', err);
  }
  // return usr.data.user;
  return usr;
}


export async function logout() {
  try {
    // await axios.post('http://localhost:3000/user/logout');
    await fetch('http://localhost:3000/user/logout', {method: 'POST', credentials: 'include', mode: 'cors', headers: {'Content-Type': 'application/json'}});
    console.log('LOGOUT SUCCESS: ', logout);
  } catch (err) {
    console.log('ERR ON LOGOUT ', err);
  }
}

export async function getMe() {
  let me;
  try {
    me = await axios.post('http://localhost:3000/user/me');
  } catch (err) {
    console.log('USER SERVOCE ERR: ', err);
  }
  return me.data;
}

// export async function isAuth(token) {

// }

export async function updateProfile(user) {
  let me;
  try {
    me = await fetch('http://localhost:3000/user/updateme', {
      method: 'POST', 
      credentials: 'include', 
      mode: 'cors', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    });
    if(me.ok){
      me = await me.json();
      console.log("ME AFTER AWAIT: ", me);
      return me;
    }
  } catch (err) {
    console.log('ERR ON LOGOUT ', err);
  }
  console.log("NEW UPDATED ME IN SERVICE LAYER: ", me)
}

export async function unlockPWD(pwd) {
  let unlocked;
  try {
    unlocked = await fetch('http://localhost:3000/user/unlockpwd', {
      method: 'POST', 
      credentials: 'include', 
      mode: 'cors', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(pwd)
    });
    if(unlocked.ok) {
      const returnResult = await unlocked.json();
      return true;
    }
    else {
      throw {
        json: await unlocked.json(),
        status: unlocked.status,
        statusText: unlocked.statusText
      }
    }
  } catch (err) {
    console.log('ERR ON LOGOUT ', err);
    return false;
  }
}