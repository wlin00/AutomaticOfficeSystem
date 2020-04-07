import {GET_DEPICON,GET_SEARCH_GROUP,SET_MODE,GET_GROUP, SET_LOADING,GET_DUTY,GET_DEPARTMENT } from '../type'

export default (state, action) => {
    const { type, payload = {} } = action
    const { info,title,depIcon,mode,_group,_groupCount,group,loading,groupCount,duty,department } = payload

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

        case GET_SEARCH_GROUP:
            return {
                ...state,
                _group: _group,
                _groupCount: _groupCount,
            }  
            
        case GET_GROUP:
            return {
                ...state,
                group: group,
                groupCount: groupCount,
                }     
        
        case GET_DUTY:
            return {
                ...state,
                duty: duty
            }
        case GET_DEPARTMENT:
            return {
                ...state,
                department: department,
                    }    
        case GET_DEPICON:
            return {
                ...state,
                depIcon: depIcon,
                title: title,
                info: info,
            }
        
         
        default:
            return state;
    }

}