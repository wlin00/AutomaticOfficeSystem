import React from 'react'
import Navbar from '../../../laout/NavbarBack'
import { Typography } from 'antd'
import Right1 from './Right1/Right1'
import Right2 from './Right2/Right2'
import Right3 from './Right3/Right3'





import { Link, Route,NavLink } from 'react-router-dom'  //用于链接跳转路由，替换a标签，不会造成页面刷新，并且可以缓存数据


import '../Authority/Authority.scss'


const Authority = (e) => {


    const { Text } = Typography


    return (<div >
        <Navbar title="自动化办公系统后台" />
        <div className="container" >
            <div className='Authority'>
                <div className='Authority-left'>
                    <div className='Authority-left__item1'>审批管理</div>

                    <Link className='Authority-left__item3' to='/authority'>
                        <img className='Authority-left__item3--img'
                            src={require('../../../../pic/12.png')}
                            alt='pic'
                        />
                        <Text className='Authority-left__item3--text'>审批管理</Text>
                    </Link>


                </div>
                <div className='Authority-bfc'>
                    <div className='Authority-right'>
                        <div className='wrapStyle'>
                            <div className='navText'><Text strong style={{color:'red'}} className='navFont'>全部流程</Text></div>
                            <ul className='Authority-ul'>
                                <li className='Authority-ul__li'><NavLink exact activeClassName="Authority-ul__li--active" className='Authority-ul__li--link' to='/authority'>行政审批</NavLink></li>
                                <li className='Authority-ul__li'><NavLink activeClassName="Authority-ul__li--active" className='Authority-ul__li--link' to='/authority/right2'>费用审批</NavLink></li>
                                <li className='Authority-ul__li'><NavLink activeClassName="Authority-ul__li--active" className='Authority-ul__li--link' to='/authority/right3'>人事审批</NavLink></li>
                            </ul>

                            <div>
                                {/* 子路由区域 */}
                                <Route exact path='/authority' component={Right1} />
                                <Route exact path='/authority/right2' component={Right2} />
                                <Route exact path='/authority/right3' component={Right3} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default React.memo(Authority)