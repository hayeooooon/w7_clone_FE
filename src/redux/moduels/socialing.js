// socialing.js
import { clear } from "@testing-library/user-event/dist/clear";
import { toDate } from "date-fns";
import { apis } from "../../api/index";

// action
const LOAD = "socialing/LOAD";
const CATEGORY = "socialing/CATEGORY";
const LOAD_MEMBERS = "socialing/LOAD_MEMBERS";
const LOAD_PENDING = "socialing/LOAD_PENDING";
const DETAIL = "socialing/DETAIL";
const CLEAR = "socialing/CLEAR";
const CLEAR_LIST = "socialing/CLEAR_LIST";

// initial state
const initialState = {
	category: [],
	list: [],
	members: [],
	pending: [],
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
	return { type: LOAD_MEMBERS, socialing_id, members, list };
};
export const loadDetail = (data) => {
	return { type: DETAIL, data };
};
export const loadPendingMembers = (members) => {
	return { type: LOAD_PENDING, members };
};
export const clearSocialings = () => {
	return { type: CLEAR };
};
export const clearSocialingList = () => {
	return { type: CLEAR_LIST };
};

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
				// console.log(res, "category");
				dispatch(loadCategory(res.data));
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const loadMembersAxios = (socialing_id, list) => {
	return async (dispatch) => {
		apis
			.loadMembers(socialing_id)
			.then((res) => {
				// console.log(res)
				dispatch(loadMembers(socialing_id, res.data, list));
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const loadPendingMembersAxios = (id) => {
	return async (dispatch) => {
		apis
			.loadPendingMembers(id)
			.then((res) => {
				const members = res.data.members;
				dispatch(loadPendingMembers(members));
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

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
				const removeStorage = async () => {
					await sessionStorage.removeItem("title");
					await sessionStorage.removeItem("content");
					await sessionStorage.removeItem("imageFile");
					await sessionStorage.removeItem("startDate");
					await sessionStorage.removeItem("startTime");
					await sessionStorage.removeItem("meetingType");
					await sessionStorage.removeItem("address");
					await sessionStorage.removeItem("recruitmentType");
					await sessionStorage.removeItem("question");
					await sessionStorage.removeItem("limitHeadcount");
					await sessionStorage.removeItem("entryFee");
					await sessionStorage.removeItem("entryFeeInfo");
					await sessionStorage.removeItem("category");
					window.location.href = "/";
				};
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
		apis
			.updateSocialing(cid, sid, formdata, config)
			.then((res) => {
				console.log(res, "수정완료");
				const removeStorage = async () => {
					await sessionStorage.removeItem("title");
					await sessionStorage.removeItem("content");
					await sessionStorage.removeItem("imageFile");
					await sessionStorage.removeItem("startDate");
					await sessionStorage.removeItem("startTime");
					await sessionStorage.removeItem("meetingType");
					await sessionStorage.removeItem("address");
					await sessionStorage.removeItem("recruitmentType");
					await sessionStorage.removeItem("question");
					await sessionStorage.removeItem("limitHeadcount");
					await sessionStorage.removeItem("entryFee");
					await sessionStorage.removeItem("entryFeeInfo");
					await sessionStorage.removeItem("category");
					window.location.href = `/view/${sid}`
				};
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

export const loadDetailAxios = (id) => {
	return async (dispatch) => {
		apis
			.loadDetail(id)
			.then((res) => {
				dispatch(loadDetail(res.data));
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const approveMemberAxios = (sid, mid) => {
	return async (dispatch) => {
		apis
			.approveMember(sid, mid)
			.then((res) => {
				console.log(res);
				window.location.href = `/manage/approved/${sid}`;
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

export const refuseMemberAxios = (sid, mid) => {
	return async (dispatch) => {
		apis
			.refuseMember(sid, mid)
			.then((res) => {
				console.log(res);
				window.location.href = `/manage/refused/${sid}`;
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

export const updateAnswerAxios = (id, answer) => {
	return async (dispatch) => {
		apis
			.updateAnswer(id, { answer })
			.then((res) => {
				console.log(res);
				window.location.href = "/completed";
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const cancelParticipateAxios = (id) => {
	return async (dispatch) => {
		apis.cancelParicipate(id).then((res) => {
			console.log(res);
			window.location.href = `/view/${id}`;
		})
		.catch((err) => {
			console.log(err);
		});
	}
}

// reducer
export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case "socialing/LOAD":
			const new_socialings = [...action.socialings];
			return {
				category: state.category,
				list: new_socialings,
				members: state.members,
				pending: [],
			};
		case "socialing/CATEGORY":
			return {
				category: action.category,
				list: state.list,
				members: state.members,
				pending: [],
			};
		case "socialing/LOAD_MEMBERS":
			let new_members;
			if (action.list === "list") {
				if (state.members === undefined) {
					new_members = [{ id: action.socialing_id, members: action.members }];
				} else {
					new_members = [
						...state.members,
						{ id: action.socialing_id, members: action.members },
					];
				}
				return {
					category: state.category,
					list: state.list,
					view: state.view,
					members: new_members,
					pending: state.pending,
				};
			} else {
				return {
					category: state.category,
					list: state.list,
					view: state.view,
					members: action.members,
					pending: state.pending,
				};
			}
		case "socialing/LOAD_PENDING":
			return {
				category: state.category,
				list: state.list,
				view: state.view,
				members: state.members,
				pending: action.members,
			};
		case "socialing/DETAIL":
			return {
				category: state.category,
				list: state.list,
				view: action.data,
				members: state.members,
			};
		case "socialing/CLEAR":
			return { category: [], list: [], view: [], members: [], pending: [] };
		case "socialing/CLEAR_LIST":
			return { category: state.category, list: [], view: [], members: [], pending: [] };
		default:
			return state;
	}
}
