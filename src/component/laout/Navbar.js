import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'  //用于链接跳转路由，替换a标签，不会造成页面刷新，并且可以缓存数据
import { Menu, Dropdown, Icon, message, Popconfirm } from 'antd'
import axios from 'axios'


const Navbar = (props) => {
    const { title } = props
    let name = localStorage.getItem('name')
    let token = localStorage.getItem('token')
    let mess = token ? name + '，欢迎' : '请登陆'

    useEffect(() => {  //useEffect 重构生命周期didMount -- 记住用户的登陆
        // let name = localStorage.getItem('name')
        // let token = localStorage.getItem('token')
        if (!token) {
            message.info('请您先登陆！');
            setTimeout(() => {
                // props.history.push({ pathname: '/' })
                window.location.href = '/'
            }, 1000)
        }
        else {
            checkToken()
        }


        //添加axios请求拦截
        axios.interceptors.request.use(function (config) {
            // Do something before request is sent
            let token = window.localStorage.getItem("token")
            let name = window.localStorage.getItem("name")

            config.headers.token = token;    //将token放到请求头发送给服务器
            config.headers.username = name;    //将token放到请求头发送给服务器
            return config;
            //这里经常搭配token使用，将token值配置到tokenkey中，将tokenkey放在请求头中
            // config.headers['accessToken'] = Token;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });

        // eslint-disable-next-line
    }, [])

    //前台token检测
    const checkToken = async () => {
        axios.post('AutomaticOfficeSystem/login/api/v1/testToken', {},
            {
                headers: {
                    'username': name,
                    'token': token
                }
            }
        ).then((data) => {
            if (data.status === 200) {
                if (data.data.msg === 'ok') {
                    console.log('check', data)
                }

            }
        }, () => {
            return Promise.reject('登陆过期，请您重新登陆')
        })
            .catch((err) => {
                console.log(err);
                message.info(err);
                localStorage.removeItem('name')
                localStorage.removeItem('token')
                localStorage.removeItem('mode')

                setTimeout(() => {
                    window.location.href = '/'
                }, 1000)
            });
    }

    const logOut = () => { //摧毁token
        localStorage.removeItem('name') //删除本地缓存
        localStorage.removeItem('token')
        localStorage.removeItem('mode')

        message.info('用户注销成功！');
        setTimeout(() => {
            // props.history.push({ pathname: '/' })
            window.location.href = '/'
        }, 1000)


    }

    const cancel = () => {
        message.info('已取消注销')
    }

    const menu = (
        <Menu>
            <Menu.Item>

                {token &&
                    <Popconfirm
                        title="退出登陆"
                        // width={100}
                        style={{ width: '1000px' }}
                        onConfirm={logOut}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <span href="#">退出登陆</span>
                    </Popconfirm>
                }

                {!token && <Link to="/">
                    请您登陆
                </Link>}
            </Menu.Item>
        </Menu>
    );

    return (
        <nav className="navbar App-header">
            <div className='nav-color'>
                {title}
            </div>
            <ul className="nav_ul">
                <li><NavLink className="link" activeClassName="nav_active" to="/index">流程中心</NavLink></li>
                <li><NavLink className="link" activeClassName="nav_active" to="/notice">信息公示</NavLink></li>
                <li><NavLink className="link" activeClassName="nav_active" to="/file">文件管理</NavLink></li>
                <li><NavLink className="link" activeClassName="nav_active" to="/people">人事门户</NavLink></li>
            </ul>
            <ul className='nav_ul2'>
                <Dropdown overlay={menu} className='dropDown'>
                    {/* // eslint-disable-next-line  */}
                    <li className="link"
                        style={{ fontSize: '21px' }}
                    >
                        {mess}
                        <Icon className='navIcon'
                            spin
                            style={{
                                fontWeight: 'bolder', fontSize: '25px'
                                , position: 'relative', top: '2px'
                            }}
                            type="down" />
                    </li>
                </Dropdown>
            </ul>
        </nav>
    )
}

Navbar.defaultProps = {  //设置默认值
    title: '自动化办公系统',
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
};
export default Navbar
