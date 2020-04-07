import React, { useReducer } from 'react';
import UserContext from './userContext';
import UserReducer from './userReducer';
import axios from 'axios'
import qs from 'qs'
import { message } from 'antd'

import { GET_GROUP,GET_SEARCH_TABLE,SET_MODE,GET_DUTY,GET_TABLE,GET_DEPARTMENT,GET_LOGINUSER, ClEAR_USER, SET_LOADING } from '../type'



const UserState = props => {
    //初始化状态
    const initialState = {
        list: [],
        loading: false,
        department:[],
        table:[],//部门具体信息
        duty:[],
        count:0,
        mode:false,
        _table: [],
        _count: 0,
        val: '',
        group: [],
        groupCount: 0,


        // total:0,
        // userInfo:{},
        // repos:[]
    };

    //使用useReducer，即state关联Reducer
    const [state, dispatch] = useReducer(UserReducer, initialState) //函数参数1：当前提交的reduver       函数参数2：当前提交的状态值 ；

    //实现方法区域                                                          
    //getLoginUser,获取登陆用户信息
    const getLoginUser = async () => { //根据login名获取user信息

        setLoading(true)//只要开始请求数据，更改为loading状态  
        let res = null
        try {
            res = await axios.get('AutomaticOfficeSystem/personnelPortal/api/v1/userInfo', {})
        } catch (err) {
            setLoading(false)
            message.info(err)
            return
        }
        dispatch({
            type: GET_LOGINUSER,
            payload: {
                list: res.data.data
            }
        })
        setLoading(false)
    };

     //getDepartment,获取部门信息
     const getDepartment = async () => { //根据login名获取user信息

        // setLoading(true)//只要开始请求数据，更改为loading状态  
        let res = null
        try {
            res = await axios.get('AutomaticOfficeSystem/common/api/v1/getDepartmentList', {})
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

    //getDepartment,获取职务信息
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

    //getTable ,获取部门表格具体信息
    const getTable = async (department,limit,page) => {
    
        setLoading(true)

        let res = null
        try{
           res  =await axios.get(`/AutomaticOfficeSystem/personnelPortal/api/v1/getAddressList?department=${department}&limit=${limit}&page=${page}`,{
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
            type: GET_TABLE,
            payload: {
                table: res.data.data,
                count:res.data.count

            }
        })
        setLoading(false)
        setMode(false)


    }
    
      //getGroup ,分页获取人员总信息
      const getGroup = async (limit,page) => {
    
        setLoading(true)

        let res = null
        try{
           res  =await axios.get(`/AutomaticOfficeSystem/organizationalManagement/api/v1/getUser?limit=${limit}&page=${page}`,{
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
        console.log(res.data.count)
        console.log('group= ',res.data.data)
        dispatch({
            type: GET_GROUP,
            payload: {
                group: res.data.data,
                groupCount: res.data.count

            }
        })
        setLoading(false)
        setMode(false)

    }

     //getSearchTable ,按搜索分页获取组织表格
     const getSearchTable = async (name,limit,page) => {
    
        setLoading(true)
        setMode(true)//改变当前分页查询为：按搜索数据

        let res = null
        try{
           res  =await axios.get(`/AutomaticOfficeSystem/personnelPortal/api/v1/searchUser?name=${name}&limit=${limit}&page=${page}`,{
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
            type: GET_SEARCH_TABLE,
            payload: {
                _table: res.data.data,
                _count: res.data.count,
                val: name

            }
        })
        setLoading(false)

    }

    //clear users
    const clearUser = () => {
        dispatch({
            type: ClEAR_USER
        })
    };

    //set loading
    const setLoading = (loading) => {
        dispatch({
            type: SET_LOADING, //使用dispatch提交到Reducer中
            payload: { loading }
        })
    }

    //set mode : false === 未搜索数据 ;   true === 按搜索数据
    const setMode = (mode) => {
        dispatch({
            type: SET_MODE, 
            payload: { mode }
        })
    }

    return (<UserContext.Provider value={{
        list: state.list,
        loading: state.loading,
        department:state.department,
        table:state.table,
        count:state.count,
        duty:state.duty,
        _count: state._count,
        _table: state._table,
        mode: state.mode,
        val: state.val,
        group: state.group,
        groupCount: state.groupCount,
        // allUser:state.allUser,
        // total:state.total,
        // userInfo:state.userInfo,
        // repos:state.repos,
        setMode,
        getSearchTable,
        getTable,
        getGroup,
        getDutyList,
        setLoading,
        clearUser,
        getLoginUser,
        getDepartment,
        // getAllUser,
    }}>{props.children}</UserContext.Provider>)


}
export default UserState
