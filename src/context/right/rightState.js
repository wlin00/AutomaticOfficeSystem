import React, { useReducer } from 'react';
import RightContext from './rightContext';
import RightReducer from './rightReducer';
import axios from 'axios'
import qs from 'qs'
import { message } from 'antd'

import {GET_PIC,CLEAR_MESS,GET_MESS,CLEAR_DATA,GET_DEPARTMENT,GET_DUTY,GET_RIGHT, SET_LOADING } from '../type'



const RightState = props => {
    //初始化状态
    const initialState = {

        //审批权限区域
        right: [],  //审批权限列表
        loading: false,
        rightCount: 0,
        duty: [],
        department: [],
        pic: [],

        //信息、轮播区域
        mess: [],  //信息列表
        messCount: 0,
        messTitle:'',
        messInfo:'',//信息内容
        


    };

    //使用useReducer，即state关联Reducer
    const [state, dispatch] = useReducer(RightReducer, initialState) //函数参数1：当前提交的reduver       函数参数2：当前提交的状态值 ；

    //实现方法区域                                                          
      //getRight ,分页获取审批表格，根据第一参数判断审批类型
    const getRight = async (permission) => {
    
        setLoading(true)

        let res = null
        try{
           res  =await axios.get(`/AutomaticOfficeSystem/approvalManagement/api/v1/approvalList?permission=${permission}`,{
           },{
               headers:{
                   'content-type':'application/json;charset=UTF-8'
               }
           })
        }catch(err){
            setLoading(false)
            // message.info(err)
            return Promise.reject(err)
        }
        dispatch({
            type: GET_RIGHT,
            payload: {
                right: res.data.data,
                rightCount: res.data.data.length

            }
        })
        setLoading(false)

    }

      //getMess ,获取审批表格，根据第一参数判断审批类型
      const getMess = async (_id) => {
    
        setLoading(true)

        let res = null
        try{
           res  =await axios.get(`/AutomaticOfficeSystem/announcement/api/v1/message`,{
           },{
               headers:{
                   'content-type':'application/json;charset=UTF-8'
               }
           })
        }catch(err){
            setLoading(false)
            return Promise.reject(err)
        }
        if(!_id){
            dispatch({
                type: GET_MESS,
                payload: {
                    mess: res.data.data,
                    messCount: res.data.data.length,
                    messTitle: '',
                    messInfo: '',
                }
            })
        }
        else{
            res.data.data.forEach(e=>{
                if(e.id === Number(_id)){
                    dispatch({
                        type: GET_MESS,
                        payload: {
                            mess: res.data.data,
                            messCount: res.data.data.length,
                            messTitle: e.title,
                            messInfo: e.content
                        }
                    })
                }
            })
        }
      
        setLoading(false)

    }

     //getMess ,获取审批表格，根据第一参数判断审批类型
     const getPic = async () => {
    
        setLoading(true)

        let res = null
        try{
           res  =await axios.get(`/AutomaticOfficeSystem/message/api/v1/shufflingFigure`,{
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
            type: GET_PIC,
            payload: {
                pic: res.data.data,

            }
        })
        setLoading(false)

    }
     
    //getDepartment,获取职务信息外键
    const getDutyList = async () => { //根据login名获取user信息

        // setLoading(true)//只要开始请求数据，更改为loading状态  
        let res = null
        try {
            res = await axios.get('/AutomaticOfficeSystem/common/api/v1/getDutyList', {})
        } catch (err) {
            // setLoading(false)
            message.info(err)
            return
        }
        
        dispatch({
            type: GET_DUTY,
            payload: {
                duty: res.data.data
            }
        })
        // setLoading(false)
    };

    //getDepartment,获取部门信息外键
    const getDepartment = async () => { //根据login名获取user信息

        // setLoading(true)//只要开始请求数据，更改为loading状态  
        let res = null
        try {
            res = await axios.get('/AutomaticOfficeSystem/common/api/v1/getDepartmentList', {})
        } catch (err) {
            // setLoading(false)
            message.info(err)
            return
        }
        
        dispatch({
            type: GET_DEPARTMENT,
            payload: {
                department: res.data.data
            }
        })
        // setLoading(false)
    };

   

    //set loading
    const setLoading = (loading) => {
        dispatch({
            type: SET_LOADING, //使用dispatch提交到Reducer中
            payload: { loading }
        })
    }

    const clearData = () => {
        dispatch({
            type: CLEAR_DATA,
        })
    }

    const clearMess = () =>{
        dispatch({
            type: CLEAR_MESS
        })
    }
   

    return (<RightContext.Provider value={{
        right: state.right,
        loading: state.loading,
        rightCount: state.rightCount,
        duty: state.duty,
        department: state.department,
        mess: state.mess,
        messCount: state.messCount,
        pic: state.pic,//向外暴露state中的属性
        messTitle: state.messTitle,
        messInfo: state.messInfo,

        getDepartment, //拉取外键
        getDutyList,
        getMess,
        getPic,
        clearData,
        getRight,
        setLoading,
        clearMess,
    }}>{props.children}</RightContext.Provider>)


}
export default RightState
