import React, { useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'  //用于链接跳转路由，替换a标签，不会造成页面刷新，并且可以缓存数据
import { Typography, Button } from 'antd'
import { Link } from 'react-router-dom'
import UserContext from '../../../../../context/user/userContext'
import Spinner from '../../../../laout/Spinner'

import '../Account/Account.scss'




const Account = (e) => {

    const { Text } = Typography
    const imgPre = require('../../../../../pic/27.png')

    //实例化context
    const userContext = useContext(UserContext)
    const { getLoginUser, loading, list = {} } = userContext


    useEffect(() => {  //useEffect 重构生命周期didMount
        // eslint-disable-next-line
        getLoginUser()
    }, [])

    const { name, email, sex, tel, username, portraits } = list



    if(loading){return <Spinner />}
    return (
        <div className='Account'>
            <div className='navText'>
                <Text strong style={{ color: '#ff0000' }} className='navFont'>账户设置</Text>
            </div>
            <ul className='Account-ul'>
                <li className='Account-ul__li'><NavLink exact activeClassName="Account-ul__li--active" className='Account-ul__li--link' to='/people'>账户设置</NavLink></li>
                <li className='Account-ul__li'><NavLink exact activeClassName="Account-ul__li--active" className='Account-ul__li--link' to='/people/pwdManage'>更改密码</NavLink></li>

            </ul>
            <div className='Account-wrap'>
                <div className='Account-wrap__box'>
                    <div className='Account-wrap__div' style={{ justifyContent: 'flex-start' }}>
                        <Text className="Account-wrap__text Account-wrap__lr">真实姓名</Text>
                        <Text className='Account-wrap__textOld'>{name ? name : (username ? username : '暂无')}</Text>
                    </div>
                    <div className='checkUnusual-wrap__div' style={{ justifyContent: 'flex-start' }}>
                        <Text className="checkUnusual-wrap__text Account-wrap__lr">性别</Text>
                        <Text className='Account-wrap__textOld'>{sex ? sex : '暂无'}</Text>

                    </div>
                </div>
                
                <div className='Account-wrap__box'>
                    <div className='Account-wrap__div' style={{ justifyContent: 'flex-start' }}>
                        <Text className="Account-wrap__text Account-wrap__lr">电子邮箱</Text>
                        <Text className='Account-wrap__textOld'>{email ? email : '暂无'}</Text>

                    </div>
                    <div className='Account-wrap__div' style={{ justifyContent: 'flex-start' }}>
                        <Text className="Account-wrap__text Account-wrap__lr">联系方式</Text>
                        <Text className='Account-wrap__textOld'>{tel ? tel : '暂无'}</Text>

                    </div>
                </div>

                <div className='Account-wrap__box' style={{ width: '50%', marginTop: '25px' }}>
                    <div className='Account-wrap__div' style={{ justifyContent: 'flex-start' }}>
                        <Text className="Account-wrap__text  Account-wrap__lr">头像</Text>
                        <div className='Account-wrap__iconDiv'>
                            {
                                !portraits ? (
                                    <img
                                        style={{ position: 'relative', top: '20px' }}
                                        className='Account-wrap__icon'
                                        src={imgPre}
                                        alt='pic'
                                    />
                                ) : (
                                        <img
                                            style={{ position: 'relative', top: '20px' }}
                                            className='Account-wrap__icon'
                                            src={portraits}
                                            alt='pic'
                                        />
                                    )

                            }
                        </div>
                    </div>
                </div>

                <div className='Account-wrap__bottom'>
                    <Link to={{ pathname: '/people/accountEdit', query: { name, email, tel, sex } }} style={{ height: '100%' }}><Button type='danger' className='Account-wrap__bottom--btn' >编辑</Button></Link>
                </div>
            </div>

        </div>
    )
}

export default React.memo(Account)
