import React, { useReducer } from 'react';
import FileContext from './fileContext';
import FileReducer from './fileReducer';
import axios from 'axios'
import qs from 'qs'
import { message } from 'antd'

import { GET_SEARCH_FILE,GET_FILE,GET_FILETYPE,SET_MODE,SET_LOADING } from '../type'



const FileState = props => {
    //初始化状态
    const initialState = {
        loading: false,
        mode: false, //false -- 普通模式； true -- 搜索模式
        fileType: [],
        file: [], //普通模式搜索文件
        count: 0, //普通模式文件总数
        _file: [], //搜索模式搜索文件
        _count: 0, //搜索模式文件总数
        val: '', //记录当前搜索文件名
        title: '', //路由匹配的页面标题名
    
    };

    //使用useReducer，即state关联Reducer
    const [state, dispatch] = useReducer(FileReducer, initialState) //函数参数1：当前提交的reduver       函数参数2：当前提交的状态值 ；

    //实现方法区域                                                          
    
    //getTable ,获取文件类型信息
    const getFileType = async (param) => {
        let res = null
        try{
           res  =await axios.get(`/AutomaticOfficeSystem/fileView/api/v1/folders`,{
           },{
               headers:{
                   'content-type':'application/json;charset=UTF-8'
               }
           })
        }catch(err){
            setLoading(false)
            return Promise.reject(err)
        }

        res.data.data.forEach(e=>{ //遍历类型数组，存储路由标题
            if(e.id === Number(param)){ 
                dispatch({
                    type: GET_FILETYPE,
                    payload: {
                        fileType: res.data.data,
                        title: e.name
                    }
                })
            }
        })
       
    }
    
    //getFile ,分页获取文件具体信息
    const getFile = async (folderId,limit,page) => {

        setLoading(true)
        let res = null
        try{
           res  =await axios.get(`/AutomaticOfficeSystem/fileView/api/v1/files?folderId=${folderId}&limit=${limit}&page=${page}`,{
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
            type: GET_FILE,
            payload: {
                file: res.data.data,
                count:res.data.count

            }
        })
        setLoading(false)
        setMode(false)

    }

    
    //   //getGroup ,用于搜素后的重置，文件总信息
    //   const getGroup = async (limit,page) => {
    
    //     setLoading(true)

    //     let res = null
    //     try{
    //        res  =await axios.get(`/AutomaticOfficeSystem/organizationalManagement/api/v1/getUser?limit=${limit}&page=${page}`,{
    //        },{
    //            headers:{
    //                'content-type':'application/json;charset=UTF-8'
    //            }
    //        })
    //     }catch(err){
    //         setLoading(false)
    //         // message.info(err)
    //         return Promise.reject(err)
    //     }
    //     console.log(res.data.count)
    //     console.log('group= ',res.data.data)
    //     dispatch({
    //         type: GET_GROUP,
    //         payload: {
    //             group: res.data.data,
    //             groupCount: res.data.count

    //         }
    //     })
    //     setLoading(false)
    //     setMode(false)

    // }

     //getSearchTable ,按搜索分页获取组织表格
     const _getFile = async (name,limit,page) => {
    
        setLoading(true)
        setMode(true)//改变当前分页查询为：按搜索数据

        let res = null
        try{
           res  =await axios.get(`/AutomaticOfficeSystem/fileView/api/v1/searchFile?name=${name}&limit=${limit}&page=${page}`,{
           },{
               headers:{
                   'content-type':'application/json;charset=UTF-8'
               }
           })
        }catch(err){
            setLoading(false)
            return Promise.reject(err)
        }
        console.log('_f_hool',res.data.data)
        dispatch({
            type: GET_SEARCH_FILE,
            payload: {
                _file: res.data.data,
                _count: res.data.count,
                val: name

            }
        })
        setLoading(false)

    }


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

    return (<FileContext.Provider value={{
        //属性区域
        loading: state.loading,
        mode: state.mode,
        fileType: state.fileType,
        file: state.file,
        _file: state._file,
        count: state.count,
        _count: state._count,
        val: state.val,
        title: state.title,
        
        //方法区域
        setMode,
        setLoading,
        getFileType,
        getFile,
        _getFile,

    }}>{props.children}</FileContext.Provider>)


}
export default FileState
