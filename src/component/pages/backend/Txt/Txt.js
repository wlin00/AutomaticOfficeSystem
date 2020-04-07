import React from 'react'
import Navbar from '../../../laout/NavbarBack'
import { Typography } from 'antd'
import PicManage from '../Txt/PicManage/PicManage'
import InfoManage from '../Txt/InfoManage/InfoManage'
import InfoEdit from '../Txt/InfoEdit/InfoEdit'
import InfoAdd from '../Txt/InfoAdd/InfoAdd'





import { Link,Route } from 'react-router-dom'  //用于链接跳转路由，替换a标签，不会造成页面刷新，并且可以缓存数据


import '../Txt/Txt.scss'


const Txt = (e) => {


    const { Text } = Typography


    return (<div >
        <Navbar title="自动化办公系统后台" />
        <div className="container" >
            <div className='Txt'>
                <div className='Txt-left'>
                    <div className='Txt-left__item1'>公告管理</div>
                 
                    <Link className='Txt-left__item3' to='/txt'>
                        <img className='Txt-left__item3--img'
                            src={require('../../../../pic/20.png')}
                            alt='pic'
                        />
                        <Text className='Txt-left__item3--text'>轮播图管理</Text>
                    </Link>
                    <Link className='Txt-left__item3' to='/txt/infoManage'>
                        <img className='Txt-left__item3--img'
                            src={require('../../../../pic/22.png')}
                            alt='pic'
                        />
                        <Text className='Txt-left__item3--text'>信息管理</Text>
                    </Link>
                  
                </div>
                <div className='Txt-bfc'>
                    <div className='Txt-right'>
                       {/* 子路由区域 */}

                       <Route path='/txt'  exact component={PicManage} />     
                       <Route path='/txt/infoManage'   component={InfoManage} />     
                       <Route path='/txt/infoAdd'   component={InfoAdd} />     
                       <Route path='/txt/infoEdit/:param'   component={InfoEdit} />     
                                         
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default React.memo(Txt)