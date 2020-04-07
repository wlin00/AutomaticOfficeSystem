import React,{useState,useEffect,useContext} from 'react'
import Navbar from '../../../laout/Navbar'
import { Typography } from 'antd'
import HotProcess from '../Index/HotProcess/HotProcess'
import RequestProcess from '../Index/RequestProcess/RequestProcess'
import TrackProcess from '../Index/TrackProcess/TrackProcess'
import Task2 from '../Index/Task2/Task2'
import overTimeReq from './requestArea/overTimeReq/overTimeReq'
import vacationReq from './requestArea/vacationReq/vacationReq'
import checkUnusual from './requestArea/checkUnusual/checkUnusual'
import sealReq from './requestArea/sealReq/sealReq'
import cardReq from './requestArea/cardReq/cardReq'
import expenseReq from './requestArea/expenseReq/expenseReq'
import travelReq from './requestArea/travelReq/travelReq'
import pactReq from './requestArea/pactReq/pactReq'

import Spinner from '../../../../component/laout/Spinner'
import UserContext from '../../../../context/user/userContext'




import { Link,Route } from 'react-router-dom'  //用于链接跳转路由，替换a标签，不会造成页面刷新，并且可以缓存数据


import '../Index/Index.scss'


const Home = (e) => {

    //文本、图片基本数据
    const { Text } = Typography
    const imgUser = require('../../../../pic/27.png')
    
    //实例化context
    const userContext = useContext(UserContext)
    const { getLoginUser, list={} } = userContext
 
    //生命周期获取list数据
    useEffect(()=>{
        getLoginUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])  

    const username= localStorage.getItem('name')?localStorage.getItem('name'):'暂无'
    const {name,portraits} = list

    return (<div >
        <Navbar title="自动化办公系统" />
        <div className="container" >
            <div className='Index'>
                <div className='Index-left'>
                    <div className='Index-left__item1'>流程中心</div>
                    <div className='Index-left__pic'>
                        {!portraits ? (
                            <img className='Index-left__pic--img'
                            src={imgUser}
                            alt='pic'
                        />
                        ):(
                            <img className='Index-left__pic--img'
                            src={portraits}
                            alt='pic'
                        />
                        )}
                    </div>
                    <div className='Index-left__item2'>{name?name:username}</div>
                    <Link className='Index-left__item3' to='/index/requestProcess'>
                        <img className='Index-left__item3--img'
                            src={require('../../../../pic/16.png')}
                            alt='pic'
                        />
                        <Text className='Index-left__item3--text'>流程申请</Text>
                    </Link>
                    <Link className='Index-left__item3' to='/index/trackProcess'>
                        <img className='Index-left__item3--img'
                            src={require('../../../../pic/1.png')}
                            alt='pic'
                        />
                        <Text className='Index-left__item3--text'>申请跟踪</Text>
                    </Link>
                    <Link className='Index-left__item3' to='/index/task2'>
                        <img className='Index-left__item3--img'
                            src={require('../../../../pic/4.png')}
                            alt='pic'
                        />
                        <Text className='Index-left__item3--text'>待办任务</Text>
                    </Link>
                </div>
                <div className='Index-bfc'>
                    <div className='Index-right'>
                       {/* 子路由区域 */}

                       <Route path='/index'  exact component={HotProcess} />                       
                       <Route path="/index/requestProcess" component={RequestProcess} />
                       <Route path="/index/trackProcess" component={TrackProcess} />
                       <Route path="/index/task2" component={Task2} />

                       <Route path="/index/overTimeReq" component={overTimeReq} />
                       <Route path="/index/vacationReq" component={vacationReq} />
                       <Route path="/index/checkUnusual" component={checkUnusual} />
                       <Route path="/index/sealReq" component={sealReq} />
                       <Route path="/index/cardReq" component={cardReq} />
                       <Route path="/index/expenseReq" component={expenseReq} />
                       <Route path="/index/travelReq" component={travelReq} />
                       <Route path="/index/pactReq" component={pactReq} />
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default React.memo(Home)
