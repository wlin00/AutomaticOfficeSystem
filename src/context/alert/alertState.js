//App.js中的方法存储区域 ， 提交当前状态到reducer

import React ,{useReducer} from 'react';
import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";
import { SET_ALERT,ClEAR_ALERT } from "../type";

const AlertState = props => {

    const initialState = {
        alert:null
    }; //设置state的初始值

    //使用useReducer，做到状态的提交，并且可从reducer中获取最新状态
    const [state,dispatch] = useReducer(AlertReducer,initialState)  //参数1：所提交到的reducer  参数2：要提交的状态值，可以为一个对象

    //实现方法
    const setAlert=(msg,type)=>{
        // setalert({msg,type}) //接收自组件的警告传值,将一个值转为对象存放在alert中
        // setTimeout(()=>{
        //   setalert(null) //定时器：2s后删除提示框显示所依赖的字段
        // },2000)

        //用dispatch替代useState的状态设置方法
        dispatch({
            type:SET_ALERT,   //类型用于reducer中的匹配
            payload:{msg,type}   
        })

        setTimeout(()=>{
            dispatch({
                type:ClEAR_ALERT,
            })
        },3000)

      };

      
      //返回视图 加上提供器Provider，可以让该视图包裹app.JS 全局挂载alert、setAlert
      return(
        <AlertContext.Provider value={{alert:state.alert,setAlert}}>
            {props.children}
        </AlertContext.Provider>   
        )

}

export default AlertState