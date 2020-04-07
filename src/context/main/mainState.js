import React, { useReducer } from 'react';
import MainContext from './mainContext';
import MainReducer from './mainReducer';
import axios from 'axios'
import qs from 'qs'
import { message } from 'antd'

import {GET_REQ,CLEAR_APPLY,GET_APPLY,GET_TYPE, SET_LOADING, GET_REQ_DOWN } from '../type'



const MainState = props => {
    //初始化状态
    const initialState = {

        //审批权限区域
        apply: [],  //自己的申请数据
        applyCount: 0,
        loading: false,

        //当前申请类型 - 外键
        applyType : [],

        //获取待办任务
        req:[],
        reqCount:0,

        //获取已完成任务 ‘1’ == 已完成 ‘2’ == 已驳回
        reqDown: [],
        reqDownCount: 0,


        


    };

    //使用useReducer，即state关联Reducer
    const [state, dispatch] = useReducer(MainReducer, initialState) //函数参数1：当前提交的reduver       函数参数2：当前提交的状态值 ；

    //实现方法区域                                                          
      //getRight ,分页获取审批表格，根据第一参数判断审批类型
    const getApply = async (type) => {
    
        console.log(type,typeof type)
        setLoading(true)
        let arr = []
        let res = null
        try{
           res  =await axios.get('/AutomaticOfficeSystem/processCenter/api/v1/application',{
           },{
               headers:{
                   'content-type':'application/json;charset=UTF-8'
               }
           })
        }catch(err){
            setLoading(false)
            return Promise.reject(err)
        }
        if(type === '1'){
console.log('-->1')

         //type=1  代表获取代办申请
         //type=2  代表获取未完成申请
         //type=3  代表获取已完成申请
        //  dispatch({
        //     type: GET_APPLY,
        //     payload: {
        //         apply: res.data.data,
        //         applyCount: res.data.data.length

        //     }
        // })
         res.data.data.forEach(e=>{
            if(e.status === 0){
              arr.push(e)
            }
         })
        }else if(type === '2'){
console.log('-->2')

            
            res.data.data.forEach(e=>{
                if(e.status === -1){
                 arr.push(e)
                }
             })
        }else if (type === '3'){
console.log('-->3')
            res.data.data.forEach(e=>{
                if(e.status === 1){
                    arr.push(e)
                }
             })
        }
        else{
console.log('-->default')

            arr = res.data.data
        }
        setTimeout(()=>{
            dispatch({
                type: GET_APPLY,
                payload: {
                    apply: arr,
                    applyCount: arr.length
    
                }
            })
            arr=[]
        })
        
        setLoading(false)
    }

      //清除申请列表
      const clearApply = () =>{
          dispatch({
              type:CLEAR_APPLY,
              
          })
      }
      //获取类型
      const getType = async (_id) => {
    
        setLoading(true)

        let res = null
        try{
           res  =await axios.get(`/AutomaticOfficeSystem/processCenter/api/v1/applicationType`,{
           },{
               headers:{
                   'content-type':'application/json;charset=UTF-8'
               }
           })
        }catch(err){
            setLoading(false)
            return Promise.reject(err)
        }
            dispatch({
                type: GET_TYPE,
                payload: {
                    applyType: res.data.data,
                }
            })
      
        setLoading(false)

    }

     //getReq,获取待办任务
     const getReq = async () => {
    
        setLoading(true)
        let res = null
        try{
           res  =await axios.get('/AutomaticOfficeSystem/processCenter/api/v1/applicationToDo',{
           },{
               headers:{
                   'content-type':'application/json;charset=UTF-8'
               }
           })
        }catch(err){
            setLoading(false)
            return Promise.reject(err)
        }

            dispatch({
                type: GET_REQ,
                payload: {
                    req: res.data.data,
                    reqCount: res.data.data.length
    
                }
            })
        
        setLoading(false)
    }


    //getReqDown 获取已完成任务
    const getReqDown = async () => {
    
        setLoading(true)
        let res = null
        try{
           res  =await axios.get('/AutomaticOfficeSystem/processCenter/api/v1/applicationDone',{
           },{
               headers:{
                   'content-type':'application/json;charset=UTF-8'
               }
           })
        }catch(err){
            setLoading(false)
            return Promise.reject(err)
        }

            dispatch({
                type: GET_REQ_DOWN,
                payload: {
                    reqDown: res.data.data,
                    reqDownCount: res.data.data.length
    
                }
            })
        
        setLoading(false)
    }



    //  //getMess ,获取审批表格，根据第一参数判断审批类型
    //  const getPic = async () => {
    
    //     setLoading(true)

    //     let res = null
    //     try{
    //        res  =await axios.get(`/AutomaticOfficeSystem/message/api/v1/shufflingFigure`,{
    //        },{
    //            headers:{
    //                'content-type':'application/json;charset=UTF-8'
    //            }
    //        })
    //     }catch(err){
    //         setLoading(false)
    //         return Promise.reject(err)
    //     }
    //     dispatch({
    //         type: GET_PIC,
    //         payload: {
    //             pic: res.data.data,

    //         }
    //     })
    //     setLoading(false)

    // }
     
    // //getDepartment,获取职务信息外键
    // const getDutyList = async () => { //根据login名获取user信息

    //     // setLoading(true)//只要开始请求数据，更改为loading状态  
    //     let res = null
    //     try {
    //         res = await axios.get('/AutomaticOfficeSystem/common/api/v1/getDutyList', {})
    //     } catch (err) {
    //         // setLoading(false)
    //         message.info(err)
    //         return
    //     }
        
    //     dispatch({
    //         type: GET_DUTY,
    //         payload: {
    //             duty: res.data.data
    //         }
    //     })
    //     // setLoading(false)
    // };

    // //getDepartment,获取部门信息外键
    // const getDepartment = async () => { //根据login名获取user信息

    //     // setLoading(true)//只要开始请求数据，更改为loading状态  
    //     let res = null
    //     try {
    //         res = await axios.get('/AutomaticOfficeSystem/common/api/v1/getDepartmentList', {})
    //     } catch (err) {
    //         // setLoading(false)
    //         message.info(err)
    //         return
    //     }
        
    //     dispatch({
    //         type: GET_DEPARTMENT,
    //         payload: {
    //             department: res.data.data
    //         }
    //     })
    //     // setLoading(false)
    // };

   

    //set loading
    const setLoading = (loading) => {
        dispatch({
            type: SET_LOADING, //使用dispatch提交到Reducer中
            payload: { loading }
        })
    }

   

    return (<MainContext.Provider value={{
        apply: state.apply,
        loading: state.loading,
        applyCount: state.applyCount,
        applyType: state.applyType,
        req:state.req,
        reqCount:state.reqCount,
        reqDown:state.reqDown,
        reqDownCount:state.reqDownCount,

        getApply,
        getType,
        setLoading,
        clearApply,
        getReq,
        getReqDown,
    }}>{props.children}</MainContext.Provider>)


}
export default MainState
