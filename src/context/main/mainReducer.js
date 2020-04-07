import { GET_REQ_DOWN, GET_REQ, CLEAR_APPLY, SET_LOADING, GET_APPLY, GET_TYPE } from '../type'

export default (state, action) => {
    const { type, payload = {} } = action
    const { reqDown,reqDownCount,req, reqCount, applyType, apply, applyCount, loading } = payload

    switch (type) {
        case SET_LOADING:
            return {
                ...state, //对state中状态字段解构
                loading: loading
            };

        case GET_APPLY:
            return {
                ...state,
                apply: apply,
                applyCount: applyCount,
            }

        case GET_TYPE:
            return {
                ...state,
                applyType: applyType,
            }

        case CLEAR_APPLY:
            return {
                ...state,
                apply: [],
                applyCount: 0,
                req:[],
                reqCount:0,
                reqDown:[],
                reqDownCount:0,
            }
        case GET_REQ:
            return {
                ...state,
                req: req,
                reqCount: reqCount,
            }
        case GET_REQ_DOWN:
            return {
                ...state,
                reqDown: reqDown,
                reqDownCount: reqDownCount,
            }

        default:
            return state;
    }

}