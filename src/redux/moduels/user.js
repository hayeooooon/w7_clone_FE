// socialing.js
import { apis } from '../../api/index';

// action
const SIGNUP = "user/SIGNUP";
const LOAD = "user/LOAD";

// initial state
const initialState = {
  user: []
}

// action creator
export const signUp = () => {
  return {type: SIGNUP}
}
export const loadUserInfo = (info) => {
  return {type: LOAD, info}
}

// middlewares
export const signUpAxios = (formdata) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    apis.signUp(formdata, config).then(
      res => {
        // sessionStorage.clear();
        // window.location.href = '/login';
      }
    ).catch(
      err => {
        console.log(err)
      }
    );
  }
}

export const signInAxios = (email, password) => {
  return async (dispatch) => {
    apis.signIn({email, password}).then(
      res => {
        const token = res.data.token;
        const limit = res.data.expiresAt;
        const validTo = Date.now() + limit;
        sessionStorage.setItem('validTo', validTo)
        sessionStorage.setItem('token', token);
        window.location.href = '/';
      }
    ).catch(
      err => {
        console.log(err)
      }
    );
  }
}

export const loadUserInfoAxios = () => {
  return async (dispatch) => {
    apis.userInfo().then(
      res => {
        console.log(res)
        const user_info = res.data.principal.member;
        dispatch(loadUserInfo(user_info))
      }
    ).catch(
      err => {
        console.log(err);
        sessionStorage.clear();
        window.location.href = '/login'
      }
    )
  }
}



// reducer
export default function reducer(state = initialState, action = {}){
  switch (action.type) {
    case "user/SIGNUP":
      console.log('signup!!!');
      return state;
    case "user/LOAD":
      return {user: [action.info]};
    default:
      return state;
  }
}