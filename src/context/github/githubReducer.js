import { SEARCH_USER, ClEAR_USER, GET_USERINFO, GET_REPOS, SET_LOADING } from '../type'

export default (state, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state, //对state中状态字段解构
                loading: true
            };
        case SEARCH_USER:
            return {
                ...state,
                loading: false,
                users: action.payload
            };
        case ClEAR_USER:
            return {
                ...state,
                users: []
            };
        case GET_USERINFO:
            return {
                ...state,
                userInfo: action.payload,
                loading: false
            }
        case GET_REPOS:
            return {
                ...state,
                loading: false,
                repos: action.payload
            }
        default:
            return state;
    }

}