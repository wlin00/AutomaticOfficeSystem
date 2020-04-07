import React,{useContext,useEffect} from 'react'
import { Typography, Table, Input, Tag, Button, Modal, message,} from 'antd'

import '../AddressBook/AddressBook.scss'
import { NavLink, Route } from 'react-router-dom'  //用于链接跳转路由，替换a标签，不会造成页面刷新，并且可以缓存数据
import Table1 from '../AddressBook/Table1/Table1'
import Table2 from '../AddressBook/Table2/Table2'
import SearchTable from '../AddressBook/SearchTable/SearchTable'
import Table3 from '../AddressBook/Table3/Table3'
import Table4 from '../AddressBook/Table4/Table4'
import Table5 from '../AddressBook/Table5/Table5'

import UserContext from '../../../../../context/user/userContext'

const AddressBook = (props) => {

    //基本信息区域
    const { Text } = Typography
    const { Search } = Input
  
    //实例化context
    const userContext = useContext (UserContext)
    const {_table,getSearchTable,getDepartment,department=[],} = userContext

    //生命周期，拉取部门信息
    useEffect(()=>{
        getDepartment()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleSearch = (v) =>{
        if(!v){
            message.info('请输入用户姓名来搜索！')
            return
        }
        console.log(v)

        console.log(_table)
        getSearchTable(v,5,1)
        console.log(_table)
        setTimeout(()=>{
            //事件循环，宏任务队列
            props.history.push({ pathname: '/people/searchTable' ,query: { name : v }})
        })

        
    }

    // console.log('dep',department)

    return (
        <div className='AddressBook'>
            <div className='navText' style={{position:'relative'}}>
                <Text strong style={{ color: '#ff0000' }} className='navFont'>通讯录</Text>
                <div className='AddressBook-search' >
                <Text style={{minWidth:'65px'}}>搜索：</Text>
                <Search
                    maxLength={20}
                    placeholder="输入用户名搜索"
                    onSearch={handleSearch}
                    style={{ width: 200 }}
                />
            </div>
            </div>

            <div className='AddressBook-wrap'>
                <div className='AddressBook-nav'>
                    <ul className='AddressBook-nav__ul'>
                     {
                         department.length>0 && 
                         department.map(dep =>(
                            <li className='AddressBook-nav__li' key={dep.id}>
                            <NavLink  className='AddressBook-navLink' 
                                      exact
                                      activeClassName='AddressBook-nav__li--active' 
                                      to={dep.id===1 ? '/people/addressBook':`/people/addressBook/table${dep.id}`}>
                                      <img className='AddressBook-nav__img'
                                          src={dep.portraits}
                                          alt='pic'
                                      />
                                    <Text className='AddressBook-nav__text'>{dep.name}</Text>
                            </NavLink>
                            </li> 
                         ))
                     }
                    {/* <li className='AddressBook-nav__li'>
                        <NavLink  className='AddressBook-navLink' exact activeClassName='AddressBook-nav__li--active' to='/people/addressBook'>
                                <img className='AddressBook-nav__img'
                                    src={require('../../../../../pic/10.png')}
                                    alt='pic'
                                />
                                <Text className='AddressBook-nav__text'>管理层</Text>
                        </NavLink>
                        </li> */}
                        {/* <li className='AddressBook-nav__li'>
                        <NavLink  className='AddressBook-navLink' activeClassName='AddressBook-nav__li--active'  to='/people/addressBook/table2'>
                                <img className='AddressBook-nav__img'
                                    src={require('../../../../../pic/2.png')}
                                    alt='pic'
                                />
                                <Text className='AddressBook-nav__text'>财务部</Text>
                        </NavLink>
                        </li>
                        <li className='AddressBook-nav__li'>

                        <NavLink className='AddressBook-navLink' activeClassName='AddressBook-nav__li--active'  to='/people/addressBook/table3'> 
                                <img className='AddressBook-nav__img'
                                    src={require('../../../../../pic/5.png')}
                                    alt='pic'
                                />
                                <Text className='AddressBook-nav__text'>人事部</Text>
                        </NavLink>
                        </li>
                        <li className='AddressBook-nav__li'>
                        <NavLink className='AddressBook-navLink' activeClassName='AddressBook-nav__li--active'  to='/people/addressBook/table4'>
                                <img className='AddressBook-nav__img'
                                    src={require('../../../../../pic/25.png')}
                                    alt='pic'
                                />
                                <Text className='AddressBook-nav__text'>研发部</Text>
                        </NavLink>
                        </li>
                        <li className='AddressBook-nav__li'>
                        <NavLink  className='AddressBook-navLink' activeClassName='AddressBook-nav__li--active' to='/people/addressBook/table5'>
                                <img className='AddressBook-nav__img'
                                    src={require('../../../../../pic/24.png')}
                                    alt='pic'
                                />
                                <Text className='AddressBook-nav__text'>销售部</Text>
                        </NavLink>
                        </li>
                        <li className='AddressBook-nav__li'>
                        <NavLink  className='AddressBook-navLink' activeClassName='AddressBook-nav__li--active' to='/people/addressBook/table5'>
                                <img className='AddressBook-nav__img'
                                    src={require('../../../../../pic/24.png')}
                                    alt='pic'
                                />
                                <Text className='AddressBook-nav__text'>销售部</Text>
                        </NavLink>
                        </li><li className='AddressBook-nav__li'>
                        <NavLink  className='AddressBook-navLink' activeClassName='AddressBook-nav__li--active' to='/people/addressBook/table5'>
                                <img className='AddressBook-nav__img'
                                    src={require('../../../../../pic/24.png')}
                                    alt='pic'
                                />
                                <Text className='AddressBook-nav__text'>销售部</Text>
                        </NavLink>
                        </li> */}
                    </ul>
                </div>
                <div className='AddressBook-bfc'>
                    <div className='AddressBook-bfc__right'>
                        <Route exact path='/people/addressBook' component={Table1}></Route>
                        <Route exact path='/people/addressBook/table:param' component={Table2}></Route>
                        <Route exact path='/people/searchTable' component={SearchTable}></Route>
                       
                        {/* <Route exact path='/people/addressBook/table2' component={Table2}></Route> */}
                        {/* <Route exact path='/people/addressBook/table3' component={Table3}></Route> */}
                        {/* <Route exact path='/people/addressBook/table4' component={Table4}></Route> */}
                        {/* <Route exact path='/people/addressBook/table5' component={Table5}></Route> */}

                    </div>
                </div>
            </div>


        </div>
    )
}

export default React.memo(AddressBook)
