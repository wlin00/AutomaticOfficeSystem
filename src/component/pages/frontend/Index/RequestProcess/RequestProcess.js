import React from 'react'
import { Typography } from 'antd'
import {  Route, NavLink } from 'react-router-dom'  //用于链接跳转路由，替换a标签，不会造成页面刷新，并且可以缓存数据

import '../RequestProcess/RequestProcess.scss'
import Administration from './Administration/Administration'
import Expense from './Expense/Expense'
import Personnel from './Personnel/Personnel'



const RequestProcess = (e) => {


    const { Text } = Typography


    return (
        <div className='RequestProcess'>
            <div className='navText'><Text strong className='navFont'>全部流程</Text></div>
            <ul className='RequestProcess-ul'>
                <li className='RequestProcess-ul__li'><NavLink exact activeClassName="RequestProcess-ul__li--active" className='RequestProcess-ul__li--link' to='/index/requestProcess'>行政审批</NavLink></li>
                <li className='RequestProcess-ul__li'><NavLink activeClassName="RequestProcess-ul__li--active" className='RequestProcess-ul__li--link' to='/index/requestProcess/expense'>费用审批</NavLink></li>
                <li className='RequestProcess-ul__li'><NavLink activeClassName="RequestProcess-ul__li--active" className='RequestProcess-ul__li--link' to='/index/requestProcess/personnel'>人事审批</NavLink></li>
            </ul>
            <div>
              {/* 嵌套子路由区域 */}
              <Route path="/index/requestProcess" exact component={Administration} />
              <Route path="/index/requestProcess/expense" component={Expense} />
              <Route path="/index/requestProcess/personnel" component={Personnel} />

            </div>

        </div>
    )
}

export default React.memo(RequestProcess)
