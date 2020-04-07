import {GET_GROUP,GET_SEARCH_TABLE,SET_MODE,GET_DUTY, GET_TABLE,GET_DEPARTMENT,GET_LOGINUSER, ClEAR_USER, SET_LOADING } from '../type'

export default (state, action) => {
    const { type, payload = {} } = action
    const { group,groupCount,val,mode,_table,_count,duty,loading, list, department,table,count } = payload

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
        case ClEAR_USER:
            return {
                ...state,
                loginUser: {}
            };
        case GET_LOGINUSER:
            return {
                ...state,
                list: list,
            };
        case GET_DEPARTMENT:
            return {
                ...state,
                department: department
            }    
        case GET_TABLE:
            return{
                ...state,
                table: table,
                count: count,
            }
       case GET_SEARCH_TABLE:
            return {
                ...state,
                _table: _table,
                _count: _count,
                val: val,   //获取搜索后的人员信息
            }          
        case GET_DUTY:
            return {
                ...state,
                duty: duty,
            }    
        case GET_GROUP:
            return {
                ...state,
                group: group, //获取人员总信息
                groupCount: groupCount
            }
        default:
            return state;
    }

}