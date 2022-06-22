// socialing.js
import { toDate } from "date-fns";
import { apis } from "../../api/index";

// action
const LOAD = "socialing/LOAD";
const CATEGORY = "socialing/CATEGORY";
const LOAD_MEMBERS = "socialing/LOAD_MEMBERS";
const DETAIL = "socialing/DETAIL";

// initial state
const initialState = {
	category: [],
	list: [],
  members: [],
  view: [],
};

// action creator
export const loadSocialings = (socialings) => {
	return { type: LOAD, socialings };
};
export const loadCategory = (category) => {
	return { type: CATEGORY, category };
};
export const loadMembers = (socialing_id, members, list) => {
  return {type: LOAD_MEMBERS, socialing_id, members, list};
}
export const loadDetail = (data) => {
  return {type: DETAIL, data};
}

// middlewares
export const loadSocialingsAxios = (tab) => {
	return async (dispatch) => {
		apis
			.loadSocialings(tab)
			.then((res) => {
				// console.log(res, "socialings");
				dispatch(loadSocialings(res.data.content));
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const loadCategoryAxios = () => {
	return async (dispatch) => {
		apis
			.getCategory()
			.then((res) => {
				console.log(res, "category");
				dispatch(loadCategory(res.data));
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const loadMembersAxios = (socialing_id, list) => {
  return async (dispatch) => {
    console.log(socialing_id)
    apis.loadMembers(socialing_id).then(
      res=>{
        console.log(res.data, '~~~~~~~', list);
        dispatch(loadMembers(socialing_id, res.data, list));
      }
    ).catch(
      err=>{
        console.log(err)
      }
    )
  }
}

export const createSocialingAxios = (category, formdata) => {
	return async (dispatch) => {
		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		};
    apis
			.createSocialing(category, formdata, config)
			.then((res) => {
        console.log(res)
        const removeStorage = async() => {
					await sessionStorage.removeItem('title');
					await sessionStorage.removeItem('content');
					await sessionStorage.removeItem('imageFile');
					await sessionStorage.removeItem('startDate');
					await sessionStorage.removeItem('startTime');
					await sessionStorage.removeItem('meetingType');
					await sessionStorage.removeItem('address');
					await sessionStorage.removeItem('recruitmentType');
					await sessionStorage.removeItem('question');
					await sessionStorage.removeItem('limitHeadcount');
					await sessionStorage.removeItem('entryFee');
					await sessionStorage.removeItem('entryFeeInfo');
					await sessionStorage.removeItem('category');
					window.location.href = '/';
				}
				removeStorage();
				
      })
			.catch((err) => {
				if (err.response) {
					// 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답했습니다.
					console.log(err.response.data);
					console.log(err.response.status);
					console.log(err.response.headers);
				} else if (err.request) {
					// 요청이 전송되었지만, 응답이 수신되지 않았습니다.
					// 'error.request'는 브라우저에서 XMLHtpRequest 인스턴스이고,
					// node.js에서는 http.ClientRequest 인스턴스입니다.
					console.log(err.request);
				} else {
					// 오류가 발생한 요청을 설정하는 동안 문제가 발생했습니다.
					console.log("Error", err.message);
				}
				console.log(err, err.config);
			});
	};
};

export const editSocialingAxios = (cid, sid, formdata) => {
	return async (dispatch) => {
		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		};
		console.log(typeof formdata)
		apis.updateSocialing(cid, sid, formdata, config).then(
			res => {
				console.log(res);
			}
		).catch(
			err => {
				if (err.response) {
					// 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답했습니다.
					console.log(err.response.data);
					console.log(err.response.status);
					console.log(err.response.headers);
				} else if (err.request) {
					// 요청이 전송되었지만, 응답이 수신되지 않았습니다.
					// 'error.request'는 브라우저에서 XMLHtpRequest 인스턴스이고,
					// node.js에서는 http.ClientRequest 인스턴스입니다.
					console.log(err.request);
				} else {
					// 오류가 발생한 요청을 설정하는 동안 문제가 발생했습니다.
					console.log("Error", err.message);
				}
				console.log(err, err.config);
			}
		)
	}
}

export const loadDetailAxios = (id) => {
  return async (dispatch) => {
    apis.loadDetail(id).then(
      res => {
        dispatch(loadDetail(res.data));
      }
    ).catch(
      err => {
        console.log(err);
      }
    )
  }
}

export const updateAnswerAxios = (id, answer) => {
	return async (dispatch) => {
		apis.updateAnswer(id, {answer}).then(
			res => {
				console.log(res);
				window.location.href = '/completed';
			}
		).catch(
			err => {
				console.log(err);
			}
		)
	}
}

// reducer
export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case "socialing/LOAD":
			// console.log("load!!!");
      const new_socialings = [...action.socialings];
			return {category: state.category, list: new_socialings, members: []};
		case "socialing/CATEGORY":
			// console.log("load category");
			return { category: action.category, list: state.list, members: [] };
		case "socialing/LOAD_MEMBERS":
      let new_members;
      if(action.list === 'list'){
				console.log('list')
				if(state.members === undefined){
					
					console.log(action.members, '??11111')
						new_members = [{id: action.socialing_id, members: action.members}];
					}else{
		
						new_members = [...state.members, {id: action.socialing_id, members: action.members}];
						console.log(new_members, '??222222')
		
					}
					return {category: state.category, list: state.list, view: state.view, members: new_members};
			}else{
				console.log('list아님', action.members)
					return {category: state.category, list: state.list, view: state.view, members: action.members};
			}
      
    case "socialing/DETAIL": 
      return {category: state.category, list: state.list, view: action.data,  members: state.members}
    default:
    return state;
	}
}



// {
//   "id": 1,
//   "socialImageUrl": “url…”,
//   "title": "소셜링 제목",
//   "content": "소셜링 내용",
//   "meetingType": "offline",
//   "recruitmentType": "approved",
//   "address": "판교역",
//   "startDate": "2022-06-15",
//   "startTime": "22:16:00"
// }