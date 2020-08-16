import axios from 'axios';

export async function login(user) {
  let usr;
  try {
    // usr = await axios.post('http://localhost:3000/login', user);
    let response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    // .then(res => console.log('res in fetch await: ', res));
    usr = await response.text();
    usr = JSON.parse(usr);
    // usr = usr.user;
    console.log('awaited user: ', usr.user);
    // let tokenClient = cookie.get("tokenClient");
  } catch (err) {
    console.log('AXIOS ERR: ', err);
  }
  // return usr.data.user;
  return usr;

// TODO: check why below is not working.
// return axios.post('http://localhost:3001/login', user)
// .then(res => {
//     console.log(res.data);
//     // getToken(res);
//     // store.set('loggedin', true);
//     localStorage.setItem('user', JSON.stringify(user.data));
//     return user.data;
// }).catch(err => {
//     console.log(err);
// })z
}

export async function logout() {
  try {
    // await axios.post('http://localhost:3000/logout');
    await fetch('http://localhost:3000/logout', {method: 'POST', credentials: 'include', mode: 'cors', headers: {'Content-Type': 'application/json'}});
    console.log('LOGOUT SUCCESS: ', logout);
  } catch (err) {
    console.log('ERR ON LOGOUT ', err);
  }
}

export async function getMe() {
  let me;
  try {
    me = await axios.post('http://localhost:3000/me');
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
    me = await axios.post('http://localhost:3000/updateMe', user);
  } catch (err) {
    console.log(err);
  }

  return me.data;
}
