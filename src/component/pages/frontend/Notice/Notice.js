import React, { useEffect, useContext } from 'react'
import { Typography } from 'antd';

import Navbar from '../../../laout/Navbar'
import NoticeIndex from './NoticeIndex/NoticeIndex'
import NoticeItem from './NoticeItem/NoticeItem'


import '../Notice/Notice.scss'
import { Link, Route } from 'react-router-dom'  //用于链接跳转路由，替换a标签，不会造成页面刷新，并且可以缓存数据


const Notice = (e) => {
    const {Text} = Typography

    return (<div>
        <Navbar title="自动化办公系统"  />
        <div className='Notice'>

        <Route path='/notice' exact component={NoticeIndex} />

        <Route path='/notice/notice:param'  component={NoticeItem} />

        </div>
        
    </div>
    )
}

export default React.memo(Notice)




//


