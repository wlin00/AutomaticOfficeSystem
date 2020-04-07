import React, { useEffect, useContext } from 'react'
import Navbar from '../../../laout/Navbar'
import { Typography } from 'antd'
import Account from './Account/Account'
import AddressBook from './AddressBook/AddressBook'
import DateManage from './DateManage/DateManage'
import PwdManage from '../People/Account/pwdManage/pwdManage'
import AccountEdit from '../People/Account/AccountEdit/AccountEdit'
import UserContext from './../../../../context/user/userContext'
import SearchTable from '../People/AddressBook/SearchTable/SearchTable'

import '../People/People.scss'



import { Link, Route } from 'react-router-dom'  //用于链接跳转路由，替换a标签，不会造成页面刷新，并且可以缓存数据


const People = (e) => {

    //文本、图片基本数据
    const { Text } = Typography
    const imgUser = require('../../../../pic/27.png')

    //实例话context
    const userContext = useContext(UserContext)
    const { getLoginUser, list={} } = userContext

    //生命周期获取list数据
    useEffect(() => {
        getLoginUser()
    }, [])
    // console.log('list2', list)
    const username = localStorage.getItem('name')?localStorage.getItem('name'):'暂无';
    const { name, portraits } = list



    return (<div >
        <Navbar title="自动化办公系统" />
        <div className="container" >
            <div className='Index'>
                <div className='Index-left'>
                    <div className='Index-left__item1'>人事门户</div>
                    <div className='Index-left__pic'>
                        {
                            !portraits ? (
                                <img className='Index-left__pic--img'
                                    src={imgUser}
                                    alt='pic'
                                />
                            ) : (
                                    <img className='Index-left__pic--img'
                                        src={portraits}
                                        alt='pic'
                                    />
                                )
                        }
                    </div>
                    <div className='Index-left__item2'>{name ? name : username}</div>
                    <Link className='Index-left__item3' to='/people'>
                        <img className='Index-left__item3--img'
                            src={require('../../../../pic/3.png')}
                            alt='pic'
                        />
                        <Text className='Index-left__item3--text'>账户设置</Text>
                    </Link>
                    <Link className='Index-left__item3' to='/people/addressBook'>
                        <img className='Index-left__item3--img'
                            style={{ position: 'relative', right: '5%' }}
                            src={require('../../../../pic/28.png')}
                            alt='pic'
                        />
                        <Text style={{ position: 'relative', right: '5%' }} className='Index-left__item3--text'>通讯录</Text>
                    </Link>
                    <Link className='Index-left__item3' to='/people/dateManage'>
                        <img className='Index-left__item3--img'
                            src={require('../../../../pic/13.png')}
                            alt='pic'
                        />
                        <Text className='Index-left__item3--text'>日程管理</Text>
                    </Link>
                </div>
                <div className='Index-bfc'>
                    <div className='Index-right'>
                        {/* 子路由区域 */}

                        <Route path='/people' exact component={Account} />
                        <Route path='/people/addressBook' component={AddressBook} />
                        <Route path='/people/dateManage' component={DateManage} />

                        <Route path='/people/pwdManage' component={PwdManage} />
                        <Route path='/people/AccountEdit' component={AccountEdit} />
                        <Route exact path='/people/searchTable' component={SearchTable}></Route>



                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default React.memo(People)  
