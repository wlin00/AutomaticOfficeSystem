//返回state提交后的最新状态

import {SET_ALERT,ClEAR_ALERT} from '../type'

export default (state,action)=>{
    switch (action.type) {  //action代表dispatch提交动作
     case SET_ALERT:
         return {
             ...state,
             alert:action.payload
         };  //payload代表提交中的附带参数信息
     case ClEAR_ALERT:
         return {
             ...state,
             alert:null
         };    
     default:
         return state;
    
    
    }
}