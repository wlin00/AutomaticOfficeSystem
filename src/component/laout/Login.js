import React, { useState, useContext, useEffect } from 'react'
import { Button, Input, Typography, message,Icon } from 'antd'
import axios from 'axios'
import AlertContext from '../../context/alert/alertContext'
import qs from 'qs'

const Login = (props) => {

    const alertContext = useContext(AlertContext) //实例化一个context，调用其中state 的方法
    const [username, setName] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [password, setPass] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const { Text } = Typography


    useEffect(() => {  //useEffect 重构生命周期didMount -- 记住用户的登陆
        let name = localStorage.getItem('name')
        let token = localStorage.getItem('token')
        let mode = localStorage.getItem('mode')

        console.log(name, token)
        if (token) {
            if(mode === '1'){
                props.history.replace({ pathname: '/index' })
                alertContext.setAlert(`欢迎回来, 尊敬的${name}`, "dark") //此处子组件调用父组件方法，通过函数回调的形式进行传值
            }
            else if (mode === '2'){
                props.history.replace({ pathname: '/indexBack' })
                alertContext.setAlert(`欢迎回来, 尊敬的${name}`, "dark") //此处子组件调用父组件方法，通过函数回调的形式进行传值
            }
           
        }
        // eslint-disable-next-line
    }, [])

    const clearData = ()=>{
        setName('')
        setPass('')
    }

    // 登陆自动化办公系统管理后台
    const handleGoLoginBack = ()=>{
        props.history.replace('/loginBack')
    }

    // 登陆
    const handleLoginFront =  (e) => {
        if (!username || !password) {
            message.info('用户名或密码不能为空');
            return
        };
        let dt = { password: password, username: username } //需提交的表单数据，需用qs转化

        // eslint-disable-next-line
        axios.post('AutomaticOfficeSystem/login/api/v1/login', qs.stringify(dt),
            {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    'Accept': 'application/json;charset=UTF-8'
                }
            }
        ).then((data) => {
            if (data.status === 200) {
                if(data.data.msg === 'ok'){
                    console.log(data.data)
                    localStorage.setItem('name', username) //登陆信息存在本地缓存
                    localStorage.setItem('token', data.data.data.token) //登陆信息存在本地缓存
                    localStorage.setItem('mode', '1') //1表示当前登陆模式为前台

                    props.history.push({ pathname: '/index' })
                    alertContext.setAlert("欢迎登陆！", "dark") 

                }

            }
        },()=>{
            return Promise.reject('请求失败，请重试！')
        })
            .catch((err) => { console.log(err);message.info(err); clearData()});
           

    }

    // 数据双向绑定
    const handleNameChange = (val) => {
        setName(val.target.value)
    }
    const handlePassChange = (val) => {
        setPass(val.target.value)
    }


    return (
        <div className="page-login"
            style={{ backgroundSize: 'cover', width: '100%', height: '100%', backgroundImage: "url(" + require("../../pic/29.jpg") + ")" }}
        >
            {/* <Logo/> */}
            <div className='login-wrap'>
                <div><Text strong className='linkFont'>自动化办公系统</Text></div>
                <span className='rootFont' >姓名：</span>
                <Input
                    className='login-name loginInp'
                    value={username}
                    placeholder="请输入用户名"
                    onChange={handleNameChange}
                />
                <span className="login-span rootFont">密码：</span>
                <Input
                    className="loginInp"
                    type="password"
                    placeholder="请输入密码"
                    value={password}
                    onChange={handlePassChange}
                />

                <div className='login-btn'><Button type="primary"
                    onClick={handleLoginFront}
                >登陆</Button></div>
                 <div className='hover-btn'><Icon type='login' className='login-icon' /><span className='loginFont'
                    onClick={handleGoLoginBack}
                >我是管理员，去后台</span></div>
            </div>
        </div>
    )
}






export default Login

