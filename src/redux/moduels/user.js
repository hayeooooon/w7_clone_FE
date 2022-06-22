// socialing.js
import { apis } from '../../api/index';

// action
const SIGNUP = "user/SIGNUP";

// initial state
const initialState = {
  user: []
}

// action creator
export const signUp = () => {
  return {type: SIGNUP}
}

// middlewares
export const signUpAxios = (formdata) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    console.log(formdata.get('profileImageFile'), typeof formdata.get('profileImageFile'))

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



// reducer
export default function reducer(state = initialState, action = {}){
  switch (action.type) {
    case "user/SIGNUP":
      console.log('signup!!!');
      return state;
    default:
      return state;
  }
}