import {GET_PIC,CLEAR_MESS,GET_MESS,CLEAR_DATA,GET_RIGHT, SET_LOADING,GET_DUTY,GET_DEPARTMENT } from '../type'

export default (state, action) => {
    const { type, payload = {} } = action
    const {messTitle,messInfo, pic,mess,messCount,right,loading,rightCount,duty,department } = payload

    switch (type) {
        case SET_LOADING:
            return {
                ...state, //对state中状态字段解构
                loading: loading
            };
        case GET_MESS:
          return {
               ...state,
               mess:  mess,
               messCount: messCount,
               messTitle: messTitle,
               messInfo: messInfo
           }    
        case GET_PIC:
            return{
                ...state,
                pic: pic
            }   
       
        case GET_RIGHT:
            return {
                ...state,
                right: right,
                rightCount: rightCount,
                }     
        
        case GET_DUTY:
            return {
                ...state,
                duty: duty
            }

        case GET_DEPARTMENT:
            return {
                ...state,
                department: department
                    }   

        case CLEAR_DATA:
            return{
                ...state,
                right: [],
                rightCount: 0,
            } 
        case CLEAR_MESS:
            return{
                ...state,
                mess: [],
                messCount: 0,
            }
        default:
            return state;
    }

}