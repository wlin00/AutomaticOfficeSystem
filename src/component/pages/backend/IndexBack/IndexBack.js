import React from 'react'
import Navbar from '../../../laout/NavbarBack'
import { Typography } from 'antd'
import TeamManage from '../IndexBack/TeamManage/TeamManage'
import Department from '../IndexBack/Department/Department'
import TeamAdd from '../IndexBack/TeamAdd/TeamAdd'
import TeamEdit from '../IndexBack/TeamEdit/TeamEdit'
import DepartmentDetail from '../IndexBack/Department/DepartmentDetail/DepartmentDetail'







import { Link,Route } from 'react-router-dom'  //用于链接跳转路由，替换a标签，不会造成页面刷新，并且可以缓存数据


import '../IndexBack/IndexBack.scss'


const IndexBack = (e) => {


    const { Text } = Typography


    return (<div >
        <Navbar title="自动化办公系统后台" />
        <div className="container" >
            <div className='IndexBack'>
                <div className='IndexBack-left'>
                    <div className='IndexBack-left__item1'>组织管理</div>
                 
                    <Link className='IndexBack-left__item3' to='/indexBack'>
                        <img className='IndexBack-left__item3--img'
                            src={require('../../../../pic/3.png')}
                            alt='pic'
                        />
                        <Text className='IndexBack-left__item3--text'>成员管理</Text>
                    </Link>
                    <Link className='IndexBack-left__item3' to='/indexBack/department'>
                        <img className='IndexBack-left__item3--img'
                            src={require('../../../../pic/9.png')}
                            alt='pic'
                        />
                        <Text className='IndexBack-left__item3--text'>组织架构</Text>
                    </Link>
                  
                </div>
                <div className='IndexBack-bfc'>
                    <div className='IndexBack-right'>
                       {/* 子路由区域 */}

                       <Route path='/indexBack'  exact component={TeamManage} />     
                       <Route path='/indexBack/department'   component={Department} />   
                       <Route path='/indexBack/teamAdd'   component={TeamAdd} />   
                       <Route path='/indexBack/teamEdit/:param'   component={TeamEdit} />   
                       <Route path='/indexBack/department:param'   component={DepartmentDetail} />   


                       
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default React.memo(IndexBack)