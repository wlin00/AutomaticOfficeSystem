import { GET_FILE, GET_SEARCH_FILE, GET_FILETYPE, SET_MODE, SET_LOADING } from '../type'

export default (state, action) => {
    const { type, payload = {} } = action
    const { title,file, count, _file, _count, val, mode, loading, fileType, } = payload

    switch (type) {
        case SET_LOADING:
            return {
                ...state, //对state中状态字段解构
                loading: loading
            };

        case SET_MODE:
            return {
                ...state, //对state中状态字段解构
                mode: mode
            };

        case GET_FILETYPE:
            return {
                ...state,
                fileType: fileType,
                title: title
            };

        case GET_FILE:
            return {
                ...state,
                file: file,
                count: count,
            }
        case GET_SEARCH_FILE:
            return {
                ...state,
                _file: _file,
                _count: _count,
                val: val,
            }

        default:
            return state;
    }

}