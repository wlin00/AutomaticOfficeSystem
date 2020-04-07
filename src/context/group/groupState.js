import React, { useReducer } from 'react';
import GroupContext from './groupContext';
import GroupReducer from './groupReducer';
import axios from 'axios'
import qs from 'qs'
import { message } from 'antd'

import { GET_DEPICON,GET_SEARCH_GROUP,SET_MODE,GET_DEPARTMENT,GET_DUTY,GET_GROUP, SET_LOADING } from '../type'



const UserState = props => {
    //初始化状态
    const initialState = {
        group: [],
        loading: false,
        groupCount: 0,
        duty: [],
        department: [],
        mode:false,
        _group: [],
        _groupCount: 0,
        depIcon: [],
        title:'',//记录当前部门标题
        info:'' ,//记录当前部门内容
        


        // total:0,
        // userInfo:{},
        // repos:[]
    };

    //使用useReducer，即state关联Reducer
    const [state, dispatch] = useReducer(GroupReducer, initialState) //函数参数1：当前提交的reduver       函数参数2：当前提交的状态值 ；

    //实现方法区域                                                          
      //getGroup ,分页获取组织表格
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

     //getGroup ,按搜索分页获取组织表格
     const getSearchGroup = async (name,limit,page) => {
    
        setLoading(true)
        setMode(true)//改变当前分页查询为：按搜索数据

        let res = null
        try{
           res  =await axios.get(`/AutomaticOfficeSystem/organizationalManagement/api/v1/searchUser?name=${name}&limit=${limit}&page=${page}`,{
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
            type: GET_SEARCH_GROUP,
            payload: {
                _group: res.data.data,
                _groupCount: res.data.count

            }
        })
        setLoading(false)

    }

      //getIcons ,获取部门图标以及信息
      const getIcons = async (_id) => {
    
        setLoading(true)

        let res = null
        try{
           res  =await axios.get('/AutomaticOfficeSystem/common/api/v1/getDepartmentList',{
           },{
               headers:{
                   'content-type':'application/json;charset=UTF-8'
               }
           })
        }catch(err){
            setLoading(false)
            return Promise.reject(err)
        }
        console.log('depIcon= ',res.data.data)
        if(!_id){
            dispatch({
                type: GET_DEPICON,
                payload: {
                    depIcon: res.data.data,
                    title: '',//存储部门标题
                    info : ''
    
                }
            })
        }else{
            res.data.data.forEach(e=>{
                if(e.id === Number(_id)){
                    console.log(e,'e')
                    dispatch({
                        type:GET_DEPICON,
                        payload: {
                            depIcon: res.data.data,
                            title: e.name,
                            info: e.responsibility
                        }
                    })

                }
            })
        }
      
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

    //set mode : false === 未搜索数据 ;   true === 按搜索数据
    const setMode = (mode) => {
        dispatch({
            type: SET_MODE, 
            payload: { mode }
        })
    }



    return (<GroupContext.Provider value={{
        group: state.group,
        loading: state.loading,
        groupCount: state.groupCount,
        duty: state.duty,
        department: state.department,
        mode: state.mode,
        _group: state._group,
        _groupCount: state._groupCount,
        depIcon: state.depIcon,
        title: state.title,
        info: state.info,

        // allUser:state.allUser,
        // total:state.total,
        // userInfo:state.userInfo,
        // repos:state.repos,
        getSearchGroup,
        getDepartment,
        getDutyList,
        getGroup,
        setLoading,
        setMode,
        getIcons,
        // clearUser,
        // getAllUser,
    }}>{props.children}</GroupContext.Provider>)


}
export default UserState
