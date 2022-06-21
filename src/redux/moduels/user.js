// user.js
import axios from "axios";

// Actions

// const ACCOUNT = "user/ACCOUNT";
const LOGIN = "user/LOGIN";
const LOGOUT = "user/LOGOUT";
const LOGIN_CHECK = "user/LOGIN_CHECK";

const initialState = {
  user: "",
  is_login: false,
};

// Action Creators
export function logInUser(user) {
  return { type: LOGIN, user };
}
export function logOutUser(user) {
  return { type: LOGOUT, user };
}
export function logincheck(email, nickname) {
  return { type: LOGIN_CHECK, email, nickname };
}

//middlewares;
export const signupDB = (formData) => {
  // email, name, password, profileImageFile
  return async function (dispatch, getState) {
    await axios
      .post("http://15.164.218.19/api/singup", formData, {
        // name: name,
        // email: email,
        // password: password,
        // profileImageFile: profileImageFile,
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((user) => {
        console.log(user);
        window.alert("회원가입이 완료되었습니다.");
        window.location.assign("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("최현준");
        window.alert("회원가입에 실패했습니다! 다시 시도해주세요");
        console.log(errorCode, errorMessage);
      });
  };
};

export const loginDB = (email, password) => {
  return function (dispatch) {
    axios
      .post("", {
        email: email,
        password: password,
      })
      .then((user) => {
        localStorage.setItem("token", user.data.token);
        dispatch(logInUser());
        window.alert("환영합니다!");
        window.location.assign("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert("로그인에 실패했습니다! 다시 시도해주세요요");
        console.log(errorCode, errorMessage);
      });
  };
};

// export const logincheckDB = () => {
//   return function (dispatch) {
//     const userId = localStorage.getItem("userId");
//     const tokenCheck = document.cookie;
//     if (tokenCheck) {
//       dispatch(logInUser({ userId: userId }));
//     } else {
//       dispatch(logOutUser());
//     }
//   };
// };

// export const idCheckFB = (userId) => {
//   // console.log(userId);
//   return async function () {
//     const _idCheck = await axios
//       .get(``)
//       .then((response) => {
//         console.log(response);
//         const message = response.data.message;
//         window.alert(message);
//       })
//       .catch((error) => {
//         console.error(error);
//         const error_message = error.response.data.errorMessage;
//         window.alert(error_message);
//       });
//   };
// };

export const logoutDB = () => {
  return function (dispatch) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("is_login");
    dispatch(logOutUser());
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      state.user = { ...action.user };
      state.is_login = true;
      return state;
    case LOGOUT:
      state.user = {};
      state.is_login = false;
      return state;
    case LOGIN_CHECK:
      return { userId: action.userId, nickname: action.nickname };
    default:
      return state;
  }
}
