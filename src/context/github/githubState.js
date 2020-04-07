import React ,{useReducer} from 'react';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import axios from 'axios'
import {SEARCH_USER,ClEAR_USER,GET_USERINFO,GET_REPOS,SET_LOADING} from '../type'

let githubClientId;
let githubClientSecret;

if(process.env.NODE_ENV !=="production"){ //不在生产环境则使用本地环境变量
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
}else{
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

}

const GithubState = props =>{
    //初始化状态
    const initialState = {
        users:[],
        loading:false,
        userInfo:{},
        repos:[]
    };
    //使用useReducer，即state关联Reducer
    const [state,dispatch] = useReducer(GithubReducer,initialState) //函数参数1：当前提交的reduver       函数参数2：当前提交的状态值 ；
    //实现方法区域                                                          
    //search user
    const searchUser = async text =>{ //e由事件回调来获取自组件的serach——input框的输入传值
        setLoading()//只要开始请求数据，更改为loading状态
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
        ${githubClientId}$client_secret=
        ${githubClientSecret}`)
        dispatch({
            type:SEARCH_USER,
            payload:res.data.items //请求数据结束，解除loading状态，并且将数据存入state
        })
      };
    //get userInfo
    const getUserInfo = async login =>{ //根据login名获取user信息
        setLoading()//只要开始请求数据，更改为loading状态
        const res = await axios.get(`https://api.github.com/users/${login}?client_id=
        ${githubClientId}$client_secret=
        ${githubClientSecret}`)
        dispatch({
            type:GET_USERINFO,
            payload:res.data
        })
      };
    //get repos 
    const getRepos = async login =>{ //根据login名获取用户仓库信息
        setLoading()//只要开始请求数据，更改为loading状态
        const res = await axios.get(`https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=
        ${githubClientId}$client_secret=
        ${githubClientSecret}`)
        dispatch({
            type:GET_REPOS,
            payload:res.data
        })
      };
    //clear users
    const clearUser=()=>{
        dispatch({
            type:ClEAR_USER
        })
      }; 

    //set loading
    const  setLoading =()=>{
        dispatch({
            type:SET_LOADING  //使用dispatch提交到Reducer中
        })
    }

    return (<GithubContext.Provider value={{
        users:state.users,
        userInfo:state.userInfo,
        repos:state.repos,
        loading:state.loading,
        setLoading,
        clearUser,
        getRepos,
        getUserInfo,
        searchUser
    }}>{props.children}</GithubContext.Provider>)


}
export default GithubState
